import { describe } from 'riteway';
import render from 'riteway/render-component';

import { UserAuthentication } from './user-authentication-component';

const noop = () => {};

const createProps = ({
  isLoggingIn = false,
  onSubmit = noop,
  disabled = false,
  email = '',
  emailError = '',
  onChangeEmail = noop,
  onBlurEmail = noop,
  onFocusEmail = noop,
} = {}) => ({
  isLoggingIn,
  onSubmit,
  disabled,
  email,
  emailError,
  onChangeEmail,
  onBlurEmail,
  onFocusEmail,
});

const createUserAuthentication = (props = {}) =>
  render(<UserAuthentication {...props} />);

describe('UserAuthentication Component', async assert => {
  {
    const props = createProps({ disabled: false });
    const $ = createUserAuthentication(props);

    assert({
      given: 'a NOT disabled form',
      should: 'render an Login button, which is NOT disabled',
      actual: $('button:contains("Sign in")').prop('disabled'),
      expected: false,
    });
  }

  {
    const props = createProps({ disabled: true });
    const $ = createUserAuthentication(props);

    assert({
      given: 'a disabled form',
      should: 'render a disabled Accept button',
      actual: $('button:contains("Sign in")').prop('disabled'),
      expected: true,
    });
  }

  {
    const props = createProps({
      email: 'Some email',
    });
    const $ = createUserAuthentication(props);

    assert({
      given: 'an email',
      should: 'render the email in the input',
      actual: $('input[value="Some email"]').val(),
      expected: props.email,
    });
  }
});
