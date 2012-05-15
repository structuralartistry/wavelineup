Wavelineup.Controllers.Invoices = {
  edit: function (id) {
    url = 'invoices/' + id;
    Wavelineup.instance.routers.main.navigate(url);

    $('#content').html('Viewing Invoice id ' + id);
  }
}
