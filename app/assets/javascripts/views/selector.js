Wavelineup.Views.Selector = Backbone.View.extend( {
  tagName: 'table',

  template: function(values) {
    var t = " \
      <tbody> \
        <tr> \
          <% _.each(values, function(value) { \
            %> <td><a class='btn selector value'><%= value %></a></td> <% \
          }); %> \
        </tr> \
      </tbody> "
    return _.template(t,values);
  },

  events: {
    'mousedown .value': 'set_value'
  },

  initialize: function(target_element_id) {
    this.target_element_id = target_element_id;
  },

  render: function() {
    $(this.el).html(this.template({ 'values': ['Credit', 'Debit', 'Other']}));

    return this;
  },

  set_value: function(event) {
    $('#' + this.target_element_id + '.target').html($(event.target).html());
    $('#selector_container').hide();
  }

});
