
//  handle_error: function(model, response) {
//    var attribute, errors, message, messages, _i, _len;
//    if (response.status === 422) {
//      $('#notices').html('');
//      errors = $.parseJSON(response.responseText).errors;
//      Wavelineup.format_model_errors(errors);
//    }
//  }

Wavelineup.Controllers.AccountingTransactions = {

  before: function() {
    /*
      note, in future once get through another page or two want to do:
        move router navigate to this before method
        move get/build model from the id up here
    */
/*
    if(!Wavelineup.instance.collections.accounting_transactions) {
      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.instance.collections.accounting_transactions.fetch();
    }
*/
    this.clear_child_modal();
  },

  clear_child_modal: function () {
    $('#modal_content').html('');
    $('#modal_content').modal('hide');
  },

  list: function() {
    this.before();
    Wavelineup.instance.routers.main.navigate('accounting_transactions');
    var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.instance.collections.accounting_transactions})
    $('#content').html(view.render().el);
  },

  new_edit: function(id, income_expense) {
    var collection, model, view, url;
    this.before();

    url = 'accounting_transactions/' + id;
    if(income_expense) url += ('/' + income_expense);
    Wavelineup.instance.routers.main.navigate(url);

    collection = Wavelineup.instance.collections.accounting_transactions;
    if(id=='new') {
      model = new Wavelineup.Models.AccountingTransaction({'income_expense': income_expense});
      view = new Wavelineup.Views.AccountingTransaction({collection: collection, model: model});
    } else {
      // requested_id is set if record not found, meaning that probably the collection has not loaded yet or that the record just does not exist
      model = Wavelineup.instance.collections.accounting_transactions.get(id) || new Wavelineup.Models.AccountingTransaction({'requested_id': id});
      view = new Wavelineup.Views.AccountingTransaction({collection: collection, model: model});
    }

    $('#modal_content').html(view.render().el);
    $('#modal_content').modal({
      backdrop: 'static'
    });
  },

  save: function(model) {
    if(model.isNew()) {
      Wavelineup.instance.collections.accounting_transactions.create(model, {
        wait: true,
        success: function() {
          $('#notices').html('Accounting Transaction accepted by server!');
          Wavelineup.Controllers.AccountingTransactions.list();
        },
        error: function(model, response) {
          switch(response.status) {
            case 422:
              var errors = $.parseJSON(response.responseText).errors;
              $('#modal_notices').html(Wavelineup.format_model_errors(errors));
              break;
            case 500:
            default:
              $('#notices').html('A fatal server error occurred.');
              Wavelineup.instance.routers.main.navigate('');
          }
        }
      });
    } else {
      model.save(null, {
        wait: true,
        success: function() {
          $('#notices').html('Accounting Transaction updated by server!');
          Wavelineup.Controllers.AccountingTransactions.list();
        },
        error: function(model, response) {
          switch(response.status) {
            case 422:
              var errors = $.parseJSON(response.responseText).errors;
              $('#modal_notices').html(Wavelineup.format_model_errors(errors));
              break;
            case 500:
            default:
              $('#notices').html('A fatal server error occurred.');
              Wavelineup.instance.routers.main.navigate('');
          }
        }
      });
    }

  },

  destroy: function(model) {
    model.destroy({
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction deleted by server!');
        Wavelineup.instance.collections.accounting_transactions.remove(model);
        Wavelineup.Controllers.AccountingTransactions.list();
      },
      error: function(model, response) {
        switch(response.status) {
          case 422:
            var errors = $.parseJSON(response.responseText).errors;
            $('#modal_notices').html(Wavelineup.format_model_errors(errors));
            break;
          case 500:
          default:
            $('#notices').html('A fatal server error occurred.');
            Wavelineup.instance.routers.main.navigate('');
        }
      }
    });
  }

}
