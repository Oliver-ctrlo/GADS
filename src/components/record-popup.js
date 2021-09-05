import { setupZebraTable } from "./zebra-table";

const setupRecordPopup = (() => {
  var setupRecordPopup = function(context) {
    $(".record-popup", context).on("click", function() {
      var record_id = $(this).data("record-id");
      var version_id = $(this).data("version-id");
      var m = $("#readmore_modal");
      var modal = m.find(".modal-body");
      modal.text("Loading...");
      var url = "/record_body/" + record_id;
      if (version_id) { url = url + "?version_id=" + version_id; }
      modal.load(url, null, function() {
        setupZebraTable(modal);
      });
      m.modal();
      // Stop the clicking of this pop-up modal causing the opening of the
      // overall record for edit in the data table
      event.stopPropagation();
    });
  };

  return context => {
    setupRecordPopup(context);
  };
})();

export { setupRecordPopup };
