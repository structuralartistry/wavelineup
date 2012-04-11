//testhelpers = { format_web_request: function(action, url, status_code, fixture) {
//    return action + ',' + url + ',' +
//  }
//}



window.web_responses = {
  accounting_transactions: {
    success: {
      get: (
            'GET', '/api/accounting_transactions',
                 [200, { "Content-Type": "application/json" },
                  '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]']
      ),
      post: (
             'POST', '/api/accounting_transactions',
                    [201, { "Content-Type": "application/json" },
                  '[{"t_datetime":"2012-04-05 13:14","t_type_id":"2","amount":"99.99","category_id":"3","account_id":"4","note":"ben wa balls"}]']
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
                      '{"errors":{"t_datetime":["can\'t be blank"],"t_type_id":["can\'t be blank"],"amount":["can\'t be blank"],"category_id":["can\'t be blank"],"account_id":["can\'t be blank"]}}']
      )
    }
  }
};

