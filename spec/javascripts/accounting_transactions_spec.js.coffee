describe 'hello world', ->

  it 'it succeeds', ->
    expect(2).toEqual(2)


describe 'accounting transactions', ->

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li')).toHaveText('2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah')
    server.restore()

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li')).toHaveText('2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah')
    server.restore()

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li')).toHaveText('2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah')
    server.restore()
