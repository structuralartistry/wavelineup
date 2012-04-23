Wavelineup.Views.OptionSelector = Backbone.View.extend( {
  tagName: 'table',

  template: function(json) {
    var t = " \
      <tbody> \
        <tr> \
          <% _.each(values, function(value) { \
            %> <td><a class='btn option_selector_option' data-value='<%= value %>'><%= value %></a></td> <% \
          }); %> \
        </tr> \
      </tbody>"
    return _.template(t,json);
  },

  events: {
    'mousedown .option_selector_option': 'set_value'
  },

  initialize: function(target_element) {
    this.$target_element = target_element;
    $('#option_selector_container').html(this.render().el);
    target_option_selector_offset = $(this.$target_element).offset();
    $('#option_selector_container').css({top: target_option_selector_offset.top, left: target_option_selector_offset.left})
    $('#option_selector_container').show();
  },

  render: function() {
    var option_selector_data_json = Wavelineup.instance.data[this.$target_element.data('option_selector_data_json')];
console.log(Wavelineup);
    if(option_selector_data_json['config']) {
      if(option_selector_data_json['config']['include_blank']) option_selector_data_json['values'].push('');
      if(option_selector_data_json['config']['include_cancel']) option_selector_data_json['values'].push('cancel');
    }
    $(this.el).html(this.template(option_selector_data_json));

    return this;
  },

  set_value: function(event) {
    if($(event.target).data('value')!='cancel') {
      this.$target_element.html($(event.target).html());
    }
    $('#option_selector_container').hide();
  }

});
