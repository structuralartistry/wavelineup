Wavelineup.Templates.Errors = {
  record_can_not_be_loaded: function() {
    var t = 'The requested record does not exist or could not be loaded, or the current internet connection is slow.'
    return _.template(t);
  }
}
