Wavelineup.Views.Selector = Backbone.View.extend( {
  tagName: 'table',

  template: function(json) {
    var t = " \
      <tbody> \
        <tr> \
          <% _.each(values, function(value) { \
            %> <td><a class='btn selector value'><%= value %></a></td> <% \
          }); %> \
        </tr> \
      </tbody>"
    return _.template(t,json);
  },

  events: {
    'mousedown .value': 'set_value'
  },

  initialize: function(target_element) {
    this.$target_element = target_element;
  },

  render: function() {
    var selector_data;
    selector_name = this.$target_element.data('selector_name');
    switch(selector_name) {
      case 'credit_debit':
        selector_data = this.credit_debit_selector_data();
        break;
      case 'accounting_categories':
        selector_data = this.accounting_category_selector_data();
        break;
      case 'accounting_accounts':
        selector_data = this.accounting_account_selector_data();
        break;
    }

    if(selector_data['config'] && selector_data['config']['include_blank']) selector_data['values'].push('');
    $(this.el).html(this.template(selector_data));

    return this;
  },

  set_value: function(event) {
    this.$target_element.html($(event.target).html());
    $('#selector_container').hide();
  },

  // test modeled data
  credit_debit_selector_data: function() {
    return {'values': ['Credit', 'Debit', 'Other'], 'config': {'include_blank': true}};
  },
  accounting_category_selector_data: function() {
    return {'values': ['Groceries', 'Laundry', 'Payment Received']};
  },
  accounting_account_selector_data: function() {
    return {'values': ['WAMU', 'B of A', 'Zions']};
  }

});
