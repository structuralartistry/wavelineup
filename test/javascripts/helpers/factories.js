BackboneFactory.define('accounting_transaction', Wavelineup.Models.AccountingTransaction, function () {
  return {
    practice_id: 1,
    income_expense: 'income',
    amount: 1234,
    accounting_category_id: 1,
    accounting_account_id: 1,
    note: 'something else'
  }
});

BackboneFactory.define('option_selector', Wavelineup.Models.OptionSelector, function () {
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

BackboneFactory.define('option_selector_option', Wavelineup.Models.OptionSelectorOption, function () {
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

