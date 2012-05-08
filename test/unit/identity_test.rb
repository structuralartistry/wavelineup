require 'test_helper'

class IdentityTest < ActiveSupport::TestCase
  should have_many :invoices
  should belong_to :practice
end
