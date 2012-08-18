
/**
 * Module dependencies.
 */

var Popover = require('popover')
  , o = require('jquery');

/**
 * Expose `ChoicePopover`.
 */

module.exports = ChoicePopover;

/**
 * Initialize a `ChoicePopover` with the given `msg`
 * and optional `title`.
 *
 * @param {Mixed} msg
 * @param {Mixed} title
 * @api public
 */

function ChoicePopover() {
  var self = this;
  var msg, title;
  var actions = [ 'No', '@Cancel', 'Yes' ];
  var arg, args = [].slice.call(arguments);
  while (arg = args.shift()) {
    if (Array.isArray(arg)) actions = arg;
    else if (!msg) msg = arg;
    else if (!title) title = arg;
  }
  var template = this.actions = o(require('./template'));
  actions
    .map(function (name) {
      var orig = name
      var main = '@' == name[0] && (name = name.substr(1))
      var el = o('<button></button>')
        .text(name)
        .addClass(slug(name))
        .click(function (ev) {
          ev.preventDefault();
          self.emit(orig);
          self.emit('choice', orig);
          self.callback(orig);
          self.hide();
        });
      if (main) {
        el.addClass('main');
        self.focus(name);
      }
      return el;
    })
    .forEach(function (el) {
      el.appendTo(template.find('.choice-popover-actions'))
    });
  Popover.call(this, this.actions, title);
  this.classname = 'popover choice-popover';
  this.message(msg);
}

/**
 * Inherits from `Popover.prototype`.
 */

ChoicePopover.prototype.__proto__ = Popover.prototype;

/**
 * Set choice `msg`.
 *
 * @param {String} msg
 * @return {ChoicePopover}
 * @api public
 */

ChoicePopover.prototype.message = function(msg){
  this.actions.find('.choice-popover-message').text(msg);
  return this;
};

/**
 * Focus `type`, either "ok" or "cancel".
 *
 * @param {String} type
 * @return {ChoicePopover}
 * @api public
 */

ChoicePopover.prototype.focus = function(type){
  this._focus = slug(type);
  return this;
};

/**
 * Show the tip attached to `el` and invoke `fn(ok)`.
 *
 * @param {jQuery|Element} el
 * @param {Function} fn
 * @return {ChoicePopover}
 * @api public
 */

ChoicePopover.prototype.show = function(el, fn){
  Popover.prototype.show.call(this, el);
  this.el.find('.' + this._focus).focus();
  this.callback = fn || function(){};
  return this;
};

/**
* Compute a slug from the given `str`.
*
* @param {String} str
* @return {String}
*/

function slug(str){
  return str
    .toLowerCase()
    .replace(/[^ \w]/g, '')
    .trim()
    .replace(/ +/g, '-');
};
