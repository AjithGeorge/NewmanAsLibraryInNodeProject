# NewmanAsLibraryInNodeProject
To extend the capabilities of newman and to introduce more programatic flexibility

With Newman as a Library
All the CLI functionality is available for programmatic use within a nodejs script. The intention is to extend the exisitng capabilities and run the postman tests form any IDE/Pipeline similar to a node project.

Creating a very basic nodejs project can be done like this: (or use the files available in this repo)

* Create a new directory using mkdir <new dir name>
* Move to the new directory using cd <new dir name>
* Create a package.json file using npm init -y
* Install the required node modules using npm install
* Create a new <filename>.js file and add the script 
* Add your collection.json file reference to the script and run using node <filename>.js

The current project has the capability to re-run the failed tests again without any manual intervention. With the help of the other features the functionalities can be extended and a framework can be developed if the need arise. All the capabilites of a test framework can be included to the library.

Newman can be easily used within your JavaScript projects as a Node.js module. The entire set of Newman CLI functionality is available for programmatic use as well.
```js
const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./sample-collection.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});

```

### newman.run(options: _object_ , callback: _function_) => run: EventEmitter
The `run` function executes a collection and returns the run result to a callback function provided as parameter. The
return of the `newman.run` function is a run instance, which emits run events that can be listened to.

| Parameter | Description   |
|-----------|---------------|
| options                   | This is a required argument and it contains all information pertaining to running a collection.<br /><br />_Required_<br />Type: `object` |
| options.collection        | The collection is a required property of the `options` argument. It accepts an object representation of a Postman Collection which should resemble the schema mentioned at [https://schema.getpostman.com/](https://schema.getpostman.com/). The value of this property could also be an instance of Collection Object from the [Postman Collection SDK](https://github.com/postmanlabs/postman-collection).<br /><br />As `string`, one can provide a URL where the Collection JSON can be found (e.g. [Postman Cloud API](https://api.getpostman.com/) service) or path to a local JSON file.<br /><br />_Required_<br />Type: `object\|string` [PostmanCollection](https://github.com/postmanlabs/postman-collection/wiki#Collection) |
| options.environment       | One can optionally pass an environment file path or URL as `string` to this property and that will be used to read Postman Environment Variables from. This property also accepts environment variables as an `object`. Environment files exported from Postman App can be directly used here.<br /><br />_Optional_<br />Type: `object\|string` |
| options.envVar            | One can optionally pass environment variables as an array of key-value string object pairs. It will be used to read Postman Environment Variables as well as overwrite environment variables from `options.environments`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.globals           | Postman Global Variables can be optionally passed on to a collection run in form of path to a file or URL. It also accepts variables as an `object`.<br /><br />_Optional_<br />Type: `object\|string` |
| options.globalVar         | One can optionally pass global environment variables as an array of key-value string object pairs. It will be used to read Postman Global Environment Variables as well as overwrite global environment variables from `options.globals`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.iterationCount    | Specify the number of iterations to run on the collection. This is usually accompanied by providing a data file reference as `options.iterationData`.<br /><br />_Optional_<br />Type: `number`, Default value: `1` |
| options.iterationData     | Path to the JSON or CSV file or URL to be used as data source when running multiple iterations on a collection.<br /><br />_Optional_<br />Type: `string` |
| options.folder            | The name or ID of the folder/folders (ItemGroup) in the collection which would be run instead of the entire collection.<br /><br />_Optional_<br />Type: `string\|array` |
| options.workingDir        | The path of the directory to be used as working directory.<br /><br />_Optional_<br />Type: `string`, Default value: `Current Directory` |
| options.insecureFileRead  | Allow reading files outside of working directory.<br /><br />_Optional_<br />Type: `boolean`, Default value: `true` |
| options.timeout           | Specify the time (in milliseconds) to wait for the entire collection run to complete execution.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutRequest    | Specify the time (in milliseconds) to wait for requests to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutScript     | Specify the time (in milliseconds) to wait for scripts to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.delayRequest      | Specify the time (in milliseconds) to wait for between subsequent requests.<br /><br />_Optional_<br />Type: `number`, Default value: `0` |
| options.ignoreRedirects   | This specifies whether newman would automatically follow 3xx responses from servers.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.insecure          | Disables SSL verification checks and allows self-signed SSL certificates.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.bail              | A switch to specify whether or not to gracefully stop a collection run (after completing the current test script) on encountering the first error. Takes additional modifiers as arguments to specify whether to end the run with an error for invalid name or path.<br /><br/>Available modifiers: `folder` and `failure`.<br />eg. `bail : ['folder']`<br /><br />_Optional_<br />Type: `boolean\|object`, Default value: `false` |
| options.suppressExitCode  | If present, allows overriding the default exit code from the current collection run, useful for bypassing collection result failures. Takes no arguments.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.reporters         | Specify one reporter name as `string` or provide more than one reporter name as an `array`.<br /><br />Available reporters: `cli`, `json`, `junit`, `progress` and `emojitrain`.<br /><br />_Optional_<br />Type: `string\|array` |
| options.reporter          | Specify options for the reporter(s) declared in `options.reporters`. <br /> e.g. `reporter : { junit : { export : './xmlResults.xml' } }` <br /> e.g. `reporter : { html : { export : './htmlResults.html', template: './customTemplate.hbs' } }` <br /><br />_Optional_<br />Type: `object` |
| options.color             | Enable or Disable colored CLI output.<br/><br/>Available options: `on`, `off` and `auto`<br /><br />_Optional_<br />Type: `string`, Default value: `auto` |
| options.sslClientCert     | The path to the public client certificate file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientKey      | The path to the private client key file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientPassphrase | The secret client key passphrase.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientCertList | The path to the client certificate configuration list file. This option takes precedence over `sslClientCert`, `sslClientKey` and `sslClientPassphrase`. When there is no match in this configuration list, `sslClientCert` is used as fallback.<br /><br />_Optional_<br />Type: `string\|array` |
| options.sslExtraCaCerts   | The path to the file, that holds one or more trusted CA certificates in PEM format.<br /><br />_Optional_<br />Type: `string` |
| options.requestAgents     | Specify the custom requesting agents to be used when performing HTTP and HTTPS requests respectively. Example: [Using Socks Proxy](#using-socks-proxy)<br /><br />_Optional_<br />Type: `object` |
| options.cookieJar     | One can optionally pass a CookieJar file path as `string` to this property and that will be deserialized using [`tough-cookie`](https://github.com/salesforce/tough-cookie). This property also accepts a `tough-cookie` CookieJar instance.<br /><br />_Optional_<br />Type: `object\|string` |
| options.newmanVersion     | The Newman version used for the collection run.<br /><br />_This will be set by Newman_ |
| callback                  | Upon completion of the run, this callback is executed with the `error`, `summary` argument.<br /><br />_Required_<br />Type: `function` |

### newman.run~callback(error: _object_ , summary: _object_)

The `callback` parameter of the `newman.run` function receives two arguments: (1) `error` and (2) `summary`

| Argument  | Description   |
|-----------|---------------|
| error                     | In case newman faces an error during the run, the error is passed on to this argument of callback. By default, only fatal errors, such as the ones caused by any fault inside Newman is passed on to this argument. However, setting `abortOnError:true` or `abortOnFailure:true` as part of run options will cause newman to treat collection script syntax errors and test failures as fatal errors and be passed down here while stopping the run abruptly at that point.<br /><br />Type: `object` |
| summary                   | The run summary will contain information pertaining to the run.<br /><br />Type: `object` |
| summary.error             | An error object which if exists, contains an error message describing the message <br /><br />Type: `object` |
| summary.collection        | This object contains information about the collection being run, it's requests, and their associated pre-request scripts and tests.<br /><br />Type: `object` |
| summary.environment       | An object with environment variables used for the current run, and the usage status for each of those variables.<br /><br />Type: `object` |
| summary.globals           | This object holds details about the globals used within the collection run namespace.<br /><br />Type: `object` |
| summary.run               | A cumulative run summary object that provides information on .<br /><br />Type: `object` |
| summary.run.stats         | An object which provides details about the total, failed, and pending counts for pre request scripts, tests, assertions, requests, and more.<br /><br />Type: `object` |
| summary.run.failures      | An array of failure objects, with each element holding details, including the assertion that failed, and the request.<br /><br />Type: `array.<object>` |
| summary.run.executions    | This object contains information about each request, along with it's associated activities within the scope of the current collection run.<br /><br />Type: `array.<object>` |

### newman.run~events

Newman triggers a whole bunch of events during the run.

All events receive two arguments (1) `error` and (2) `args`. **The list below describes the properties of the second
argument object.**

| Event     | Description   |
|-----------|---------------|
| start                     | The start of a collection run |
| beforeIteration           | Before an iteration commences |
| beforeItem                | Before an item execution begins (the set of prerequest->request->test) |
| beforePrerequest          | Before `prerequest` script is execution starts |
| prerequest                | After `prerequest` script execution completes |
| beforeRequest             | Before an HTTP request is sent |
| request                   | After response of the request is received |
| beforeTest                | Before `test` script is execution starts |
| test                      | After `test` script execution completes |
| beforeScript              | Before any script (of type `test` or `prerequest`) is executed |
| script                    | After any script (of type `test` or `prerequest`) is executed |
| item                      | When an item (the whole set of prerequest->request->test) completes |
| iteration                 | After an iteration completes |
| assertion                 | This event is triggered for every test assertion done within `test` scripts |
| console                   | Every time a `console` function is called from within any script, this event is propagated |
| exception                 | When any asynchronous error happen in `scripts` this event is triggered |
| beforeDone                | An event that is triggered prior to the completion of the run |
| done                      | This event is emitted when a collection run has completed, with or without errors |

To enable the functionality of a given feature for the htmlextra reporter, uncomment any of the options within the htmlextra object.

```js
const newman = require('newman');

newman.run({
    collection: './pathToFile/collection.json', // Collection URL from a public link or the Postman API can also be used
    reporters: ['htmlextra'],
    iterationCount: 1,
    reporter: {
        htmlextra: {
            // export: './report.html',
            // template: './template.hbs'
            // logs: true,
            // showOnlyFails: true,
            // noSyntaxHighlighting: true,
            // testPaging: true,
            // browserTitle: "My Newman report",
            // title: "My Newman Report",
            // titleSize: 4,
            // omitHeaders: true,
            // skipHeaders: "Authorization",
            // omitRequestBodies: true,
            // omitResponseBodies: true,
            // hideRequestBody: ["Login"],
            // hideResponseBody: ["Auth Request"],
            // showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            // showFolderDescription: true,
            // timezone: "Australia/Sydney",
            // skipFolders: "folder name with space,folderWithoutSpace",
            // skipRequests: "request name with space,requestNameWithoutSpace",
            // displayProgressBar: true
        }
    }
});
}
```
