
//  handle_error: function(model, response) {
//    var attribute, errors, message, messages, _i, _len;
//    if (response.status === 422) {
//      $('#notices').html('');
//      errors = $.parseJSON(response.responseText).errors;
//      Wavelineup.write_model_errors_to_screen(errors);
//    }
//  }

Wavelineup.Controllers.AccountingTransactions = {

  before: function() {
    if(!Wavelineup.Collections.accounting_transactions) {
      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.Collections.accounting_transactions.fetch();
    }
  },

  new_edit: function(id) {
    var view, model;
    this.before();
    Wavelineup.Routers.main.navigate('accounting_transactions/' + id);

    if(id=='new') {
      view = new Wavelineup.Views.AccountingTransaction({model: new Wavelineup.Models.AccountingTransaction()});
    } else {
      model = Wavelineup.Collections.accounting_transactions.get(id);
      view = new Wavelineup.Views.AccountingTransaction({model: model});
    }
    $('#content').html(view.render().el);
  },

  save: function(model) {
    if(model.isNew()) {
      Wavelineup.Collections.accounting_transactions.create(model, {
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
      model.save();
      Wavelineup.Controllers.AccountingTransactions.list();
    }

  },

  list: function() {
    this.before();
    Wavelineup.Routers.main.navigate('accounting_transactions/');
    var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
    $('#content').html(view.render().el);
  },

  destroy: function(model) {
    model.destroy({
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction deleted by server!');
        Wavelineup.Collections.accounting_transactions.remove(model);
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
  }

}
