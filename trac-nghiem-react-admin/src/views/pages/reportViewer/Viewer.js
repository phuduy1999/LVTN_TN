import React, { useEffect } from "react";

export default function Viewer({ data, reportTemplate, title }) {

  useEffect(() => {
    if (data === {}) return;
    console.log("Loading Viewer view");

    console.log("Creating the report viewer with default options");
    var viewer = new window.Stimulsoft.Viewer.StiViewer(
      null,
      "StiViewer",
      false
    );

    console.log("Creating a new report instance");
    var report = new window.Stimulsoft.Report.StiReport();

    console.log("Load report from url" + window.location.origin);
    report.loadFile(window.location.origin + "/reportsTemplate/" + reportTemplate);

    report.dictionary.databases.clear();
    var dataSet = new window.Stimulsoft.System.Data.DataSet("Demo");
    dataSet.readJson(data);
    // dataSet.readJsonFile(window.location.origin + "/reportsTemplate/Demo.json");
    console.log("...........", dataSet);
    report.dictionary.databases.clear();
    if (title) {
      report.dictionary.variables.getByName("title").valueObject = title;
    }
    report.regData("Demo", "Demo", dataSet);

    console.log(
      "Assigning report to the viewer, the report will be built automatically after rendering the viewer"
    );
    viewer.report = report;
    console.log("Rendering the viewer to selected element");
    viewer.renderHtml("viewer");
  }, [data]);

  return <div id="viewer"></div>;
}
