import { createQuestion } from 'features/question/question-factories';
import { describe } from 'riteway';
import { render } from 'utils/render';

import { Home } from './home-component';

const createProps = ({
  questions = [],
  acceptedPoints = 0,
  rejectedPoints = 0,
  totalPoints = 0,
} = {}) => ({ questions, acceptedPoints, rejectedPoints, totalPoints });

const createHome = (props = {}) => render(<Home {...props} />);

describe('Home Component', async assert => {
  {
    const totalPoints = 3000;
    const acceptedPoints = 2000;
    const rejectedPoints = 1000;

    const props = createProps({ totalPoints, acceptedPoints, rejectedPoints });
    const $ = createHome(props);

    assert({
      given: 'a totalPoints prop',
      should: 'render the totalPoints',
      actual: $(`dd:contains("${totalPoints}")`).text(),
      expected: `${totalPoints}`,
    });

    assert({
      given: 'an acceptedPoints prop',
      should: 'render the acceptedPoints',
      actual: $(`dd:contains("${acceptedPoints}")`).text(),
      expected: `${acceptedPoints}`,
    });

    assert({
      given: 'an rejectedPoints prop',
      should: 'render the rejectedPoints',
      actual: $(`dd:contains("${rejectedPoints}")`).text(),
      expected: `${rejectedPoints}`,
    });
  }
  {
    const first = createQuestion();
    const second = createQuestion();

    const questions = [first, second];
    const props = createProps({ questions });

    const $ = createHome(props);

    assert({
      given: 'questions',
      should: 'render all the questions and the table header',
      actual: $('tr').length,
      expected: 3,
    });
  }
});
