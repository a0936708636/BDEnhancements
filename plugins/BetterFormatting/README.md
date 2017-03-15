# BetterFormatting - [Download Here](https://raw.githubusercontent.com/Anxeal/BDEnhancements/master/plugins/BetterFormatting/BetterFormatting.plugin.js)

Lets you format your messages with buttons and adds more formatting options.

The new tags this plugin adds convert the Latin characters into Unicode characters. This has two consequences:
 1. Only Latin characters in the ASCII table will be affected by the tags. (Not really an issue if you speak English or use the English alphabet.)
 2. Everyone else will be able see the new formatting options even if they don't use the plugin. (Unless they use a font which doesn't support Unicode, which is unlikely.)

## Features

### Formatting Toolbar
BetterFormatting adds a handy toolbar to make formatting easier.

Click the buttons to insert tags or surround the selected text with tags.

![BetterFormatting Toolbar](https://my.mixtape.moe/tgzkvq.png)

### New Formatting Options

#### Superscript (^)
`^Sample Text^` will show up as ˢᵃᵐᵖˡᵉ ᵀᵉˣᵗ

#### Small Caps (%)
`%Sample Text%` will show up as Sᴀᴍᴘʟᴇ Tᴇxᴛ

#### Fullwidth (#)
`#Sample Text#` will show up as Ｓａｍｐｌｅ　Ｔｅｘｔ

#### Upsidedown (&)
`&Sample Text&` will show up as ʇxǝ┴ ǝldɯɐS

#### Escaping Unwanted Tags (\\)
Put a backslash before the tags if you want 	them to be rendered normally.

`\#Sample Text\#` will show up as \#Sample Text\#

## Coming Soon
- Reverting formatted text when a message is being edited.

## Known Bugs and Issues
 - Clicking the buttons on the toolbar too rapidly will cause the tags to be inserted on a different place than where the caret is and move the caret.
 - Opening the toolbar hides a portion of the most recent message.


## Special Thanks
 - Squirtle#1998 for giving me inspiration for this plugin
 - Vehdrehl#8902 for pointing out many bugs