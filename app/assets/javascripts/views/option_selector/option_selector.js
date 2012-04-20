Wavelineup.Views.OptionSelector = Backbone.View.extend( {
  tagName: 'table',

  template: function(json) {
    var t = " \
      <tbody> \
        <tr> \
          <% _.each(values, function(value) { \
            %> <td><a class='btn option_selector_option value'><%= value %></a></td> <% \
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
  },

  render: function() {
    var option_selector_data;
    option_selector_name = this.$target_element.data('option_selector_name');
    switch(option_selector_name) {
      case 'credit_debit':
        option_selector_data = this.credit_debit_option_selector_data();
        break;
      case 'accounting_categories':
        option_selector_data = this.accounting_category_option_selector_data();
        break;
      case 'accounting_accounts':
        option_selector_data = this.accounting_account_option_selector_data();
        break;
    }

    if(option_selector_data['config'] && option_selector_data['config']['include_blank']) option_selector_data['values'].push('');
    $(this.el).html(this.template(option_selector_data));

    return this;
  },

  set_value: function(event) {
    this.$target_element.html($(event.target).html());
    $('#option_selector_container').hide();
  },

  // test modeled data
  credit_debit_option_selector_data: function() {
    return {'values': ['Income', 'Expense', 'Other'], 'config': {'include_blank': true}};
  },
  accounting_category_option_selector_data: function() {
    return {'values': ['Groceries', 'Laundry', 'Payment Received']};
  },
  accounting_account_option_selector_data: function() {
    return {'values': ['WAMU', 'B of A', 'Zions']};
  }

});
