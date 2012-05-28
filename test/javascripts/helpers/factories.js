
var accounting_transaction_factory = BackboneFactory.define('accounting_transaction', Wavelineup.Models.AccountingTransaction, function () {
  return {
    practice_id: 1,
    income_expense: 'income',
    amount: 1234,
    accounting_category_id: 1,
    accounting_account_id: 1,
    note: 'something else'
  }
});

/*
var userFactory = BackboneFactory.define('user', User, function(){
                                   return {
                                     name : 'Backbone User',
                                     email: BackboneFactory.next('person_email')
                                      };
                                    }
                                   );
*/


var option_selector_factory = BackboneFactory.define('option_selector', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'some name'
  }
});
BackboneFactory.define('option_selector_accounting_category_income', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'accounting_category_income'
  }
});
BackboneFactory.define('option_selector_accounting_category_expense', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'accounting_category_expense'
  }
});
BackboneFactory.define('option_selector_accounting_account', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'accounting_account'
  }
});
BackboneFactory.define('option_selector_identity_type', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'identity_type'
  }
});
BackboneFactory.define('option_selector_product_service', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'product_service'
  }
});


BackboneFactory.define_sequence('option_selector_option_value', function(n){
  return 'value ' + n;
});

var option_selector_option_factory = BackboneFactory.define('option_selector_option', Wavelineup.Models.OptionSelectorOption, function () {
  return {
    value: BackboneFactory.next('option_selector_option_value')
  }
});

// OPTION SELECTORS AND OPTIONS
// next is to automatically create a few options per each option selector... then return both as collections, then we have our seed data...
var all_option_selector_options = [];

var option_selector_accounting_category_income = BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_income' } } );
var option_selector_accounting_category_expense = BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_expense' } } )
var option_selector_accounting_account = BackboneFactory.create('option_selector', function() { return { name: 'accounting_account' } } )
var option_selector_identity_type = BackboneFactory.create('option_selector', function() { return { name: 'identity_type' } } )
var option_selector_product_service = BackboneFactory.create('option_selector', function() { return { name: 'product_service' } } )


// create default options for an option selector
var create_options_for_option_selector = function (option_selector) {
  _.each([1,2,3], function () {
    var factory = BackboneFactory.create('option_selector_option', function () {
      return {
        option_selector_id: option_selector.get('id')
      }
    });
    all_option_selector_options.push(factory);
  });

  // blank
//  var factory = BackboneFactory.create('option_selector_option', function () {
//    return {
//      option_selector_id: option_selector.get('id'),
//      value: ' '
//    }
//  });
//  all_option_selector_options.push(factory);
//
//  // cancel
//  var factory = BackboneFactory.create('option_selector_option', function () {
//    return {
//      option_selector_id: option_selector.get('id'),
//      value: 'Cancel'
//    }
//  });
//  all_option_selector_options.push(factory);
}
create_options_for_option_selector(option_selector_accounting_category_income);
create_options_for_option_selector(option_selector_accounting_category_expense);
create_options_for_option_selector(option_selector_accounting_account);
create_options_for_option_selector(option_selector_identity_type);
create_options_for_option_selector(option_selector_product_service);

var all_option_selectors = [
  option_selector_accounting_category_income,
  option_selector_accounting_category_expense,
  option_selector_accounting_account,
  option_selector_identity_type,
  option_selector_product_service
]


var simulate_paginated_server_response = function(records_array) {
  var output = {"records": records_array,"total_record_count":1,"page_size":15,"page_number":1};
  _.each(records_array, function(record){
    output.records.push(record) }
  );
  return output;
}

var set_wavelineup_base_data = function(accounting_transactions_array){
  Wavelineup.set_base_data = function() {
    Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();

    Wavelineup.instance.collections.option_selectors.reset(all_option_selectors);

    Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
    Wavelineup.instance.collections.option_selector_options.reset(all_option_selector_options);

    Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();

    var accounting_transactions = simulate_paginated_server_response(accounting_transactions_array);

    Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
  }
}

var accounting_transactions_base_json;

var factor_out_before_each = function(accounting_transactions) {
  this.server = sinon.fakeServer.create();

  setFixtures("<div id='container'>Loading...</div>");
  expect($('#container')).toHaveText('Loading...');

  Wavelineup.set_base_data = function() {
    Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();

    Wavelineup.instance.collections.option_selectors.reset(all_option_selectors);

    Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
    Wavelineup.instance.collections.option_selector_options.reset(all_option_selector_options);

    Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();


    var accounting_transactions = simulate_paginated_server_response(accounting_transactions_base_data);

    Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
  }

  // turn off the router
  if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

  Wavelineup.init();

  Wavelineup.instance.routers.main.navigate('accounting_transactions', true);
  current_url = Backbone.history.getHash();
  expect(current_url).toEqual('accounting_transactions')
}

factor_out_after_each = function() {
  this.server.restore();
  setFixtures('');
  if(typeof jQuery.ajax.restore == 'function') jQuery.ajax.restore();
}
