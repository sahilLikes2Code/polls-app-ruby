require 'test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get polls_create_url
    assert_response :success
  end

end
