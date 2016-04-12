var fs = require('fs');
var UglifyJS = require("uglify-js");

function minifyProject(path, destination) {
    fs.readdir(path, function(err, files) {
        for (i = 0; i < files.length; i++) {
            file = path + "\\" + files[i];

            if (fs.lstatSync(file).isDirectory()) {
                try {
                    fs.accessSync(destination + "\\" + files[i], fs.F_OK);
                } catch (e) {

                    fs.mkdirSync(destination + "\\" + files[i]);
                }

                minifyProject(file, destination + "\\" + files[i]);
            } else {
                var ext = files[i].split(".")[1];
                if (ext == "js") {
                    var result = UglifyJS.minify(file);
                    var contents = fs.writeFileSync(destination + "\\" + files[i], result.code);
                } else {

                    fs.writeFileSync(destination + "\\" + files[i], fs.readFileSync(file));
                }

            }

        }

    })
};

function checkDirectory(path) {

    try {
        fs.accessSync(path);
        return true;
    } catch (e) {

        return false;
    }

}
process.argv.forEach((val, index, array) => {
    if (index == 2) {
        sourcePath = val;
        if (!checkDirectory(sourcePath)) {
            console.log("Source Path not defined");
            process.exit();
        }
    }
    if (index == 3) {
        destPath = val;
        if (!checkDirectory(destPath)) {
            console.log("Destination Path not defined");
            process.exit();
        }

    }

});
minifyProject(sourcePath, destPath);