window.web_responses = {
  accounting_transactions: {
    success: {
      get: (
            'GET', '/api/accounting_transactions',
                 [200, { "Content-Type": "application/json" },
                  '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","date_time":"2012-01-01T13:00:00Z","credit_debit_id":1,"updated_at":"2012-04-04T21:14:57Z" }]']
      ),
      post: (
             'POST', '/api/accounting_transactions',
                    [201, { "Content-Type": "application/json" },
                  '[{"date_time":"2012-04-05 13:14","credit_debit_id":"2","amount":"99.99","category_id":"3","account_id":"4","note":"ben wa balls"}]']
      ),
      put: (
             'PUT', '/api/accounting_transactions/1',
                    [204, { "Content-Type": "application/json" },
                     '[{}]']
      ),
      delete: (
             'DELETE', '/api/accounting_transactions/1',
                    [204, { "Content-Type": "application/json" },
                     '[{}]']
      )
    },
    failure: {
      post: (
             'POST', '/api/accounting_transactions',
                     [422, { "Content-Type": "application/json" },
                      '{"errors":{"date_time":["can\'t be blank"],"credit_debit_id":["can\'t be blank"],"amount":["can\'t be blank"],"category_id":["can\'t be blank"],"account_id":["can\'t be blank"]}}']
      )
    }
  }
};

