Wavelineup.Views.AccountingTransaction = Backbone.View.extend( {
  tagName: 'li',

  template: function(json) {
    var t = " \
      <ul class='selector'> \
        <li><input type='text' id='date_time' value='<%= date_time %>'></li> \
        <li><input type='text' id='credit_debit_id' value='<%= credit_debit_id %>'></li> \
        <li><input type='text' id='amount' value='<%= amount %>'></li> \
        <li><input type='text' id='category_id' value='<%= category_id %>'></li> \
        <li><input type='text' id='account_id' value='<%= account_id %>'></li> \
        <li><input type='text' id='note' value='<%= note %>'></li> \
        <li><input class='save' type='submit' value='Save'></li> \
        <li><input class='delete' type='submit' value='Delete'></li> \
        <li><input class='cancel' type='submit' value='Cancel'></li> \
      </ul>"
    return _.template(t,json);
  },

  events: {
    'mousedown .delete': 'delete',
    'mousedown .save': 'save',
    'mousedown .cancel': 'cancel'
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  cancel: function() {
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  save: function() {
    this.model.set({
      date_time: $('input#date_time').val(),
      credit_debit_id: $('input#credit_debit_id').val(),
      amount: $('input#amount').val(),
      category_id: $('input#category_id').val(),
      account_id: $('input#account_id').val(),
      note: $('input#note').val()
    });

    Wavelineup.Controllers.AccountingTransactions.save(this.model);
  },

  delete: function() {
    Wavelineup.Controllers.AccountingTransactions.destroy(this.model);
  }
});
