describe 'hello world', ->

  it 'it succeeds', ->
    expect(2).toEqual(2)


describe 'accounting transactions', ->

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    view = new Wavelineup.Views.AccountingTransactionsIndex()
    $('#container').html(view.render().el)
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')

  it 'loads the dynamic content into the mustache template', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    view = new Wavelineup.Views.AccountingTransactionsIndex()
    $('#container').html(view.render().el)
    expect($('#container p')).toHaveText('something dynamic')

