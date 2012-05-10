Wavelineup.Views.AccountingTransaction = Backbone.View.extend( {
  tagName: 'li',

  events: {
    'mousedown .delete': 'delete',
    'mousedown .save': 'save',
    'mousedown .cancel': 'cancel',
    'mousedown .option_selector.target': 'show_option_selector',
    'change #credit_debit_key': 'set_category_selector_name'

  },

  initialize: function() {
    // reload view when collection resets as if are coming in from direct url collection will not have fetched upon first render
    // we know it has not loaded as there is a requested_id attribute
    this.collection.on('reset', function() {Wavelineup.Controllers.AccountingTransactions.new_edit(this.model.get('requested_id'))}, this);
  },

  template: function(json) {
    return Wavelineup.Templates.AccountingTransactions.accounting_transaction(json);
  },

  render: function() {
    // if there is a requested it do not proced, the model has not loaded nor the collection -- a loaded record will never have
    // requested_id in its attributes
    if(this.model.get('requested_id')) {
      $(this.el).html(Wavelineup.Templates.Errors.record_can_not_be_loaded());
    } else {
      $(this.el).html(this.template(this.model.to_local_json()));
    }
    return this;
  },

  cancel: function() {
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  save: function() {
    this.model.set({
      date_time: $('input#date_time').val(),
      credit_debit_key: $('#credit_debit_key.option_selector.target').data('set_key').toString(),
      amount: $('input#amount').val(),
      category_key: $('#category_key.option_selector.target').data('set_key').toString(),
      account_key: $('#account_key.option_selector.target').data('set_key').toString(),
      note: $('input#note').val()
    });

    Wavelineup.Controllers.AccountingTransactions.save(this.model);
  },

  delete: function() {
    Wavelineup.Controllers.AccountingTransactions.destroy(this.model);
  },

  // note this may be ripe to move to a global event aggregator
  show_option_selector: function(event) {
    // the accounting category selector name is determined by whether this is an income or expense
    // so when this value is toggled, we change the selector referenced on the category key field
    if($(event.target).data('option_selector_name').indexOf('accounting_credit_debit')>=0) {
      $(event.target).closest('ul').find('#category_key').data('option_selector_name','accounting_category_income');
    } else {
      $(event.target).closest('ul').find('#category_key').data('option_selector_name','accounting_category_expense');
    }

    new Wavelineup.Views.OptionSelector($(event.target));
  },

  set_category_selector_name: function(event) {
console.log('change');
    if($(event.target).data('option_selector_name').indexOf('accounting_credit_debit')>=0) {
      $(event.target).closest('ul').find('#category_key').data('option_selector_name','accounting_category_income');
    } else {
      $(event.target).closest('ul').find('#category_key').data('option_selector_name','accounting_category_expense');
    }
  }

});
