- 安装 zsh
- 安装 homebrew
- brew install autojump
- 在 .zshrc 中找到 plugins=，在后面添加
- plugins=(git autojump)


然后继续在上述文件中添加

```sh
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
source ~/.zshrc
```
