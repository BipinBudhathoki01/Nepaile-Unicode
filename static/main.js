function selectAll(txtbox) {
  if (txtbox.createTextRange) {
    /*IE*/ t = txtbox.createTextRange();
    if (t.select) t.select();
    if (t.execCommand) t.execCommand("copy");
  }
  if (txtbox.setSelectionRange) {
    /*Mozilla*/ txtbox.setSelectionRange(0, txtbox.value.length);
  } else if (txtbox.createTextRange) {
    /*Opera 8*/ var r = txtbox.createTextRange();
    r.select();
  }
  if (txtbox.focus) txtbox.focus();
}
var liveConverstion;
function clearInput() {
  if (
    Form1.ascii.value.length < 30 ||
    confirm("Are you sure you want to clear what you typed?")
  ) {
    Form1.ascii.value = "";
    Form1.unicode.value = "";
    Form1.ascii.focus();
  }
}
function convertLive(flag) {
  if (flag) {
    if (Form1.ascii.value.length > 1500) {
      alert(
        "Text is too large for live conversion. Please press the 'Convert' button."
      );
      Form1.convertItLive[1].checked = true;
      return convertLive(false);
    }
    Form1.convertNow.disabled = true;
    translate(
      Form1.ascii,
      Form1.unicode,
      eval(Form1.htmlEncode.value),
      Form1.smartConverter_.checked
    );
    liveConversion = true;
  } else {
    Form1.convertNow.disabled = false;
    liveConversion = false;
  }
}
function convert() {
  if (liveConversion == true && Form1.ascii.value.length <= 1500) {
    translate(
      Form1.ascii,
      Form1.unicode,
      eval(Form1.htmlEncode.value),
      Form1.smartConverter_.checked
    );
  } else if (liveConversion == true && Form1.ascii.value.length > 1500)
    convertLive(true);
}
smartConverter(true);
translate(
  Form1.ascii,
  Form1.unicode,
  eval(Form1.htmlEncode.value),
  Form1.smartConverter_.checked
);
Form1.ascii.focus();
convertLive(true);
function copyToClipboard() {
    var unicodeTextarea = document.getElementById("unicodeTextarea");
    var textToCopy = unicodeTextarea.value; // Get the text without label
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Clipboard successfully set
        alert("Text copied to clipboard: " + textToCopy);
    }).catch(function() {
        // An error occurred
        alert("Unable to copy text to clipboard");
    });
}