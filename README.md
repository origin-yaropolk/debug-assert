Small lib that helps your app meet fail-fast and fail-save principles.

## Usage
```javascript
import { assert } from 'debug-assert';

assert(myCondition, 'Print this if failed');
```
You can setup your own fail-fast function:

```javascript
import { assert, setupFailFast } from 'debug-assert';

setupFailFast((err: Error) => {
  console.error(err);
  collectSomeData();
  process.abort();
});

assert(myCondition, 'Print this if failed');
```
Change the principle by calling `setupMode` function:
```javascript
import { assert, setupMode } from 'debug-assert';

// calls fail-fast function
// it's default behaviour
assert(myCondition, 'Print this if failed');

setupMode('fail-safe');
// throws an exception
assert(myCondition, 'Print this if failed');

setupMode('ignore');
// replaced with noop
assert(myCondition, 'Print this if failed');
```
There is an `assertNotNull` alias:
```javascript
import { assertNotNull } from 'debug-assert';

assertNotNull(null, 'Print this if failed'); // will fail
assertNotNull(undefined, 'Print this if failed'); // not fail
assertNotNull(0, 'Print this if failed'); // not fail
```
