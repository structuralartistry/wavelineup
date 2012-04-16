Wavelineup.Views.Layout = Backbone.View.extend( {
  template: function() {
    var template = " \
      <div id='header'>HEADER</div> \
      <div id='left_column'>LEFT COLUMN</div> \
      <div id='notices'>NOTICES</div> \
      <div id='content'>CONTENT</div>"
    return _.template(template);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
