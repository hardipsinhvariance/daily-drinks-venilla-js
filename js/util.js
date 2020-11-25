//Global .numbersOnly class to prevent any other characters to textbox except numbers
$(".numbersOnly").keypress(function (evt) {
  if (evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

//Method is used to encode string to html
function escapeHtml(string) {
  //List of special characters to be replaced.
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}