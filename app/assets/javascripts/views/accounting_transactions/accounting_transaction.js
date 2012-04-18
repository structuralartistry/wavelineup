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
        <li><input id='test_event_button' type='submit' value='Test An Event'></li> \
      </ul>"
    return _.template(t,json);
  },

  events: {
    'mousedown .delete': 'delete',
    'mousedown .save': 'save'
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  save: function(event) {
    event.preventDefault();

    this.model.set({
      date_time: $('input#date_time').val(),
      credit_debit_id: $('input#credit_debit_id').val(),
      amount: $('input#amount').val(),
      category_id: $('input#category_id').val(),
      account_id: $('input#account_id').val(),
      note: $('input#note').val()
    });

    if(this.model.isNew()) {
      Wavelineup.Collections.accounting_transactions.create(this.model, {
        wait: true,
        success: function() {
          $('#notices').html('Accounting Transaction accepted by server!');
          Wavelineup.Controllers.AccountingTransactions.list();
        },
        error: function(model, response) {
          var attribute, errors, message, messages, _i, _len;
          if (response.status === 422) {
            $('#notices').html('');
            var errors = $.parseJSON(response.responseText).errors;
            Wavelineup.write_model_errors_to_screen(errors);
          }
        }
      });
    } else {
      this.model.save();
      Wavelineup.Controllers.AccountingTransactions.list();
    }
  },

  delete: function() {
    alert('delete');
  }
});
