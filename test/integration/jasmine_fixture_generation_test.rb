require 'test_helper'

class JasmineFixtureGenerationTest < ActionDispatch::IntegrationTest

  def save_file_and_verify(data)
    file_path = File.expand_path("#{Rails.root}/test/javascripts/helpers/controller_fixtures.js")

    File.delete(file_path) if File.exists?(file_path)
    File.open(file_path, 'w') {|f| f.write(data) }
    file_content = File.read(file_path)
    return File.exists?(file_path) && file_content == data
  end

  should 'work' do
    file_path = File.expand_path("#{Rails.root}/test/javascripts/helpers/controller_fixtures.js")
    File.delete(file_path) if File.exists?(file_path)
    #File.open(file_path, 'w') {|f| f.write(data) }
    file = File.open(file_path, 'w')


    output = ''
    50.times { Factory(:accounting_transaction) }

    action = 'api/accounting_transactions'
    get action, :format => :json

    # use controller name + url + type as name
    file.puts "var accounting_transactions_index_get = { url: \"#{action}\", response: #{response.body} }"

    url = 'api/accounting_transactions'
    variable_name = "#{url.gsub('/','_')}_post"
    #post url, "{\"accounting_account_id\":1,\"amount\":\"2.22\",\"accounting_category_id\":2,\"id\":222,\"note\":\"new accounting transaction\",\"date_time\":\"2012-02-22T22:22:22Z\",\"income_expense\":\"expense\"}"
    post url, {:format => :json}
    file.puts  "var #{variable_name} = { url: \"#{url}\", response: #{response.body} }"

#    url = 'api/accounting_transactions/99999'
#    variable_name = "#{url.gsub('/','_')}_put"
#    put url, {:format => :json}
#    file.puts  "var #{variable_name} = { url: \"#{url}\", response: #{response.body} }"
#
#    file_content = File.read(file_path)
#    assert File.exists?(file_path)
#    # && file_content == output
  end

end
