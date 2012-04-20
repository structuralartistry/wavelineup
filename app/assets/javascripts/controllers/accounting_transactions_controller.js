
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
    /*
      note, in future once get through another page or two want to do:
        move router navigate to this before method
        move get/build model from the id up here
    */

    if(!Wavelineup.Collections.accounting_transactions) {
      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.Collections.accounting_transactions.fetch();
    }
  },

  list: function() {
    this.before();
    Wavelineup.Routers.main.navigate('accounting_transactions');
    var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
    $('#content').html(view.render().el);
  },

  new_edit: function(id) {
console.log('controller new edit' + id.toString())
    var collection, model, view;
    this.before();
    Wavelineup.Routers.main.navigate('accounting_transactions/' + id);

    collection = Wavelineup.Collections.accounting_transactions;
    if(id=='new') {
      view = new Wavelineup.Views.AccountingTransaction({collection: collection, model: new Wavelineup.Models.AccountingTransaction()});
    } else {
      model = Wavelineup.Collections.accounting_transactions.get(id) || new Wavelineup.Models.AccountingTransaction({'requested_id': id});
      view = new Wavelineup.Views.AccountingTransaction({collection: collection, model: model});
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
