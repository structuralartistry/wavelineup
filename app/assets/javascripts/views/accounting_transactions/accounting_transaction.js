Wavelineup.Views.AccountingTransaction = Backbone.View.extend( {
  tagName: 'li',

  events: {
    'mousedown .delete': 'delete',
    'mousedown .save': 'save',
    'mousedown .cancel': 'cancel',
    'mousedown .option_selector_target': 'show_option_selector'
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
      $(this.el).html(this.template(this.model.toJSON()));
    }
    return this;
  },

  cancel: function() {
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  save: function() {
    this.model.set({
      date_time: $('input#date_time').val(),
      credit_debit_id: $('#credit_debit_id.option_selector_target').data('set_key'),
      amount: $('input#amount').val(),
      category_id: $('input#category_id').val(),
      account_id: $('input#account_id').val(),
      note: $('input#note').val()
    });

    Wavelineup.Controllers.AccountingTransactions.save(this.model);
  },

  delete: function() {
    Wavelineup.Controllers.AccountingTransactions.destroy(this.model);
  },

  // note this may be ripe to move to a global event aggregator
  show_option_selector: function(event) {
    new Wavelineup.Views.OptionSelector($(event.target));
  }
});
