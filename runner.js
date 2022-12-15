const newman = require('newman');

let retryFailedTests = true

newman.run({
    collection: 'collection.json',
    //environment: 'environmentConfig.json',
    //folder: ['f1','f3'],
    reporters: ['cli', 'htmlextra'],
    iterationCount: 1,
    reporter: {
        htmlextra: {
            // export: './report.html',
            // template: './template.hbs'
            // logs: true,
            //showOnlyFails: true,
            noSyntaxHighlighting: true,
            browserTitle: "Sample-Test-Report",
            title: "Test Summary-All",
            titleSize: 3,
            omitHeaders: true,
            // skipHeaders: "Authorization",
            // omitRequestBodies: true,
            // omitResponseBodies: true,
            //hideRequestBody: ["Authentication"],
            //hideResponseBody: ["SessionId", "Token"],
            showEnvironmentData: true,
            //skipEnvironmentVars: ["password",],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            showFolderDescription: false,
            //skipFolders: "f2",
            // timezone: "Australia/Sydney"
        }
    }

}, function (err, summary) {
    if (retryFailedTests) {
        let rawData = summary.run.failures;
        let failures = [];
        rawData.forEach(function (failure) {
            failures.push(failure.source.name)
        });
        failures = [...new Set(failures)]
        if (failures.length > 0) {
            newman.run({
                collection: 'collection.json',
                //environment: './environmentConfig.json',
                folder: [failures],
                reporters: ['cli', 'htmlextra'],
                iterationCount: 1,
                reporter: {
                    htmlextra: {
                        // export: './report.html',
                        // template: './template.hbs'
                        // logs: true,
                        //showOnlyFails: true,
                        noSyntaxHighlighting: true,
                        // testPaging: true,
                        browserTitle: "Sample-Test-Report",
                        title: "Test Summary-Retry",
                        titleSize: 3,
                        omitHeaders: true,
                        // skipHeaders: "Authorization",
                        // omitRequestBodies: true,
                        // omitResponseBodies: true,
                        //hideRequestBody: ["SessionId", "Token"],
                        //hideResponseBody: ["SessionId", "Token"],
                        showEnvironmentData: true,
                        skipEnvironmentVars: ["password"],
                        // showGlobalData: true,
                        // skipGlobalVars: ["API_TOKEN"],
                        // skipSensitiveData: true,
                        // showMarkdownLinks: true,
                        showFolderDescription: false,
                        // timezone: "Australia/Sydney"
                    }
                }
            })
        }
    }

}).on('start', function (err, options) {
    //console.log(this.summary.collection.items.members[0].items.members);
    //console.log(this.options)
    console.log('running collection...')
});





