import { handler } from '../../src/actions/listActions';

// TODO #1: Rename xit() to it() to enable the test.
// TODO #2: Change the test name below to match your use case.
xit('should verify if the listActions action works as expected', async () => {
  const result = await handler();

  expect(result).toEqual({
    /* TODO #4: Specify the expected value of the result. */
  });
});
