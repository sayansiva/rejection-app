import { describe } from 'riteway';
import render from 'riteway/render-component';

import { RejectionForm } from './rejection-form-component';

describe('RejectionFrom Component', async assert => {
  const createProps = ({
    question = '',
    askee = '',
    disabled = false,
  } = {}) => ({ question, askee, disabled });
  const createRejectionForm = (props = {}) =>
    render(<RejectionForm {...props} />);

  {
    const props = createProps({ disabled: false });
    const $ = createRejectionForm(props);

    assert({
      given: 'a NOT disabled form',
      should: 'render an Accept button, which is NOT disabled',
      actual: $('button:contains("Accepts")').prop('disabled'),
      expected: false,
    });

    assert({
      given: 'a NOT disabled form',
      should: 'render a Reject button, which is NOT disabled',
      actual: $('button:contains("Reject")').prop('disabled'),
      expected: false,
    });
  }

  {
    const props = createProps({ disabled: true });
    const $ = createRejectionForm(props);

    assert({
      given: 'a disabled form',
      should: 'render a disabled Accept button',
      actual: $('button:contains("Accepts")').prop('disabled'),
      expected: true,
    });

    assert({
      given: 'a disabled form',
      should: 'render a Reject button, which is NOT disabled',
      actual: $('button:contains("Reject")').prop('disabled'),
      expected: true,
    });
  }

  {
    const props = createProps({
      question: 'Some question',
      askee: 'Some askee',
    });
    const $ = createRejectionForm(props);

    assert({
      given: 'a question',
      should: 'render the question',
      actual: $('input[value="Some question"]').val(),
      expected: props.question,
    });

    assert({
      given: 'an askee',
      should: 'render the askee',
      actual: $('input[value="Some askee"]').val(),
      expected: props.askee,
    });
  }
});
