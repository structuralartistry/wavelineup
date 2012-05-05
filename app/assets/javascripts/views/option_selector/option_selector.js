Wavelineup.Views.OptionSelector = Backbone.View.extend( {
  tagName: 'table',

  template: function(option_selector_options) {
    var t = " \
      <tbody> \
        <tr> \
          <% _.each(option_selector_options, function(option_selector_option) { \
            %> <td><a class='btn option_selector option' data-key='<%= option_selector_option.get('key') %>' data-value='<%= option_selector_option.get('value') %>'><%= option_selector_option.get('value') %></a></td> <% \
          }); %> \
        </tr> \
      </tbody>"
    return _.template(t,option_selector_options);
  },

  events: {
    'mousedown .option_selector.option': 'set_value'
  },

  initialize: function(target_element) {
    this.$target_element = target_element;
    $('#option_selector_container').html(this.render().el);
    target_option_selector_offset = $(this.$target_element).offset();
    $('#option_selector_container').css({top: target_option_selector_offset.top, left: target_option_selector_offset.left})
    $('#option_selector_container').show();
  },

  render: function() {
    var option_selector = Wavelineup.instance.collections.option_selectors.where({name: this.$target_element.data('option_selector_name')})[0];
    var filtered_option_selector_options = Wavelineup.instance.collections.option_selector_options.where({option_selector_id: option_selector.id});

    var data = { option_selector_options: filtered_option_selector_options };
    $(this.el).html(this.template({option_selector_options: filtered_option_selector_options}));

    return this;
  },

  set_value: function(event) {
    if($(event.target).data('key')!='cancel') {
      // set the visible html in the target element
      this.$target_element.html($(event.target).data('value'));
      // set the 'data-set_key' property of the target element
      this.$target_element.data('set_key', $(event.target).data('key'));
      // set the 'data-set_value' property of the target element
      this.$target_element.data('set_value', $(event.target).data('value'));
    }
    $('#option_selector_container').hide();
  }

});
