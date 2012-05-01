window.fixtures = {
  accounting_transactions: {
    attributes: ['date_time','credit_debit_id','amount','category_id','account_id','note'],
    errors: '{"errors":{"date_time":["can\'t be blank"],"credit_debit_id":["can\'t be blank"],"amount":["can\'t be blank"],"category_id":["can\'t be blank"],"account_id":["can\'t be blank"]}}',
    one: { "account_id":1,
            "amount":"1.11",
            "category_id":11,
            "created_at":"2001-01-01T01:01:01Z",
            "id":111,
            "note":"accounting transaction one",
            "date_time":"2011-11-11T11:11:11Z",
            "credit_debit_id":1111,
            "updated_at":"2001-01-01T01:01:01Z" },
    two: { "account_id":2,
           "amount":"2.22",
           "category_id":22,
           "created_at":"2002-02-02T02:02:02Z",
           "id":222,
           "note":"accounting transaction two",
           "date_time":"2012-02-22T22:22:22Z",
           "credit_debit_id":2222,
           "updated_at":"2002-02-02T02:02:02Z" }
  },
  option_selectors: [
{"created_at":"2012-05-01T21:55:55Z","id":1,"name":"credit_debit","updated_at":"2012-05-01T21:55:55Z"},{"created_at":"2012-05-01T21:55:55Z","id":2,"name":"category","updated_at":"2012-05-01T21:55:55Z"},{"created_at":"2012-05-01T21:55:55Z","id":3,"name":"financial_account","updated_at":"2012-05-01T21:55:55Z"}
  ],
  option_selector_options: [
{"created_at":"2012-05-01T21:55:55Z","id":1,"key":"1","option_selector_id":1,"updated_at":"2012-05-01T21:55:55Z","value":"Income"},{"created_at":"2012-05-01T21:55:55Z","id":2,"key":"2","option_selector_id":1,"updated_at":"2012-05-01T21:55:55Z","value":"Expense"},{"created_at":"2012-05-01T21:55:55Z","id":3,"key":"blank","option_selector_id":1,"updated_at":"2012-05-01T21:55:55Z","value":""},{"created_at":"2012-05-01T21:55:55Z","id":4,"key":"cancel","option_selector_id":1,"updated_at":"2012-05-01T21:55:55Z","value":"Cancel"},{"created_at":"2012-05-01T21:55:55Z","id":5,"key":"1","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Cafe"},{"created_at":"2012-05-01T21:55:55Z","id":6,"key":"2","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Dining"},{"created_at":"2012-05-01T21:55:55Z","id":7,"key":"3","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Groceries"},{"created_at":"2012-05-01T21:55:55Z","id":8,"key":"4","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Rent"},{"created_at":"2012-05-01T21:55:55Z","id":9,"key":"5","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Utilities"},{"created_at":"2012-05-01T21:55:55Z","id":10,"key":"blank","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":""},{"created_at":"2012-05-01T21:55:55Z","id":11,"key":"cancel","option_selector_id":2,"updated_at":"2012-05-01T21:55:55Z","value":"Cancel"},{"created_at":"2012-05-01T21:55:55Z","id":12,"key":"1","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":"B of A CC"},{"created_at":"2012-05-01T21:55:55Z","id":13,"key":"2","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":"Cash"},{"created_at":"2012-05-01T21:55:55Z","id":14,"key":"3","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":"CHAP"},{"created_at":"2012-05-01T21:55:55Z","id":15,"key":"4","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":"Zions"},{"created_at":"2012-05-01T21:55:55Z","id":16,"key":"blank","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":""},{"created_at":"2012-05-01T21:55:55Z","id":17,"key":"cancel","option_selector_id":3,"updated_at":"2012-05-01T21:55:55Z","value":"Cancel"}
  ]
}
