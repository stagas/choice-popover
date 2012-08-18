
# Choice Popover

  Popover choice component built on top of [Popover](http://github.com/component/popover).

## Features

  - all the features of Popover / Tip

## Events

  - `show` the confirmation is shown
  - `hide` the confirmation is hidden
  - `choice` the user made a choice
  - also emits an event of the actual choice text

## API

### new ChoicePopover(msg, [title], choices)

  Create a new popover with `msg` and optional `title`.

```javascript
var choices = [ 'Yes, delete him!', 'Can\'t decide :(', '@No, leave him alone!' ];
var confirm = new Choice('This action cannot be undone.', 'Delete tobi?', choices);
confirm.show(el);
```

### ChoicePopover#focus(choice)

  Focus on that choice.

### ChoicePopover#show(el, [fn])

  Attach to `el`, and invoke `fn` with
  a boolean representing the user's choice.

  When `fn` is omitted you may still utilize the `cancel` / `ok` events.

### ...

  View [Tip](http://github.com/component/tip) and [Popover](http://github.com/component/popover) for additional
  API documentation.

## License

  MIT