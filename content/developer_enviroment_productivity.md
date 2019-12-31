export const meta = { 
  id: 'developer_enviroment_productivity', 
  title: 'Developer Enviroment and Productivity', 
  description: 'How to build enviroment which will force you to have right habbits and will make you super productive? What way to compose operation system, apps, terminals, shells, editors, command line tools, compilers, scripts in a way that makes most productive?', 
  tags: ['dotfiles', 'ansible', 'iaac', 'infrastructure', 'provisioning', 'automation', 'brew', 'vim',  'nvim', 'alacritty', 'git', 'enviroment', 'developer', 'productivity', 'terminal', 'grep', 'rust', 'python', 'javascript', ''],
  createdAt: '2019-11-01',
  public: false
};

# Developer Enviroment and Productivity

<img src={'https://images.unsplash.com/photo-1505238680356-667803448bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'} altText />

## Outline

1. Intro
2. Editor - NVIM
3. Terminal - Alacritty
4. Shell - ZSH
5. Automation - Ansible, Brew

## Intro

Last 7 years I was working as Software Engineer. All this time I was trying to improve my productivity by using right techniques and leveraging right tools in my Developer Enviroment.

Most of the time I spend in **command line**, writing code in **Vim**, executing commands in **Zsh** shell, which is opened in **Tmux** tab, which is rendered in **Alacritty** terminal emulator and all this is run by **macOS** on my Mac.

> Developer enviroment - enviroment used to develop or modificate software. It is composition of operation system, apps, terminals, shells, editors, command line tools, compilersand scripts.

> Developer productivity - amount of useful work performed over time. Daily habits like prefering typing over mousing, ways of thinking, awareness of existing tools and their capabilities.

> Installation and configuration of software is done automatically via Ansible provisioning scripts that you can find here. [osx-automation](https://github.com/atsman/osx-automation)

## Editor - VIM (NVIM)

<img src="/static/images/developer_enviroment_productivity/neovim-logo.svg" size="medium" round />

> [Neovim][Neovim Github] - community driven, refactored version of vim.

Vim is my main text editor. Vim allows me to edit text faster than any other tool. As soon as I learned how to use it on basic level I never wanted to return back to other editors.

Editors with Vim emulation can't provide complete expirience of Vim. Some features are missing, or it works slightly differently. I tryed vscode and idea with vim plugins. Only in Vim I got full power of mappings, custom functions, buffers, tabs, multiple cliboards, etc.

Vim teached me to learn right habbits. Hands never take off the keys. Keeping them in an optimum position to input text, to scroll, to navigate or to apply commands.

<img src="/static/images/developer_enviroment_productivity/nvim-screen.png" size="medium" />

My general advice - don't start by copying someones config. Try to go step by step, building your own setup, understanding of editor granually. Use articles like this to learn how others use it or search for .dotfiles on github.

The way I use Vim:

* Plugin management - [**Vim-Plug**][VimPlug Github]
* File explorer - [**Nerdtree**][Nerdtree Github]
* Navigation / Search - [**FZF**][FZF Github], [**FZF plugin**][FZF Vim Github], [**RipGrep**][RipGrep Github]
* Autocomplete - [**YCM**][YCM Github]
* Linting - [**Ale**][Ale Github]
* Git - [**Fugitive**][Vim Fugitive Github], [**Gitgutter**][Vim GitGutter Github]
* Language integration - LSP

### Plugin management 

[**Vim-plug**][VimPlug Github] minimalist vim plugin.

<img src="/static/images/developer_enviroment_productivity/nvim_plug_install.gif" size="medium" shadow round />

Features:

* **On demand plugin loading** - for fast startup. When you open Vim, it loads only needed plugins for particular file type.
* **Fast installation / update** - uses shadow clones, parallel installation.

Example of configuration file:

```viml
Plug 'w0rp/ale' " Load on start
Plug 'fatih/vim-go', { 'for': 'go' } " Load only for Go files 
Plug 'pangloss/vim-javascript', { 'for': 'javascript' }
Plug 'tpope/vim-fireplace', { 'for': 'clojure' }
Plug 'rust-lang/rust.vim', { 'for': 'rust' }
```

### File tree 

The NERDTree is a tree explorer plugin. It allows you to browse directory hierarchies and manipulate filesystem operations. It presents the filesystem in form of tree, which you navigate in Vim style.

<img src="/static/images/developer_enviroment_productivity/nvim_nerdtree.gif" size="medium" round shadow />

*Mappings*:
```viml
" Toggle file tree
nnoremap <leader>n :NERDTreeToggle<cr>
" Find current file in the tree
nnoremap <leader>f :NERDTreeFind<cr>
```

*While NERDTree is focused*
```
t - open file in new tab
i - open file in a hsplit
s - open file in a vsplit
o / enter - open file in main buffer
```

For more info run `:help NERDTree` in your vim editor or check docs on [Github](https://github.com/scrooloose/nerdtree/blob/master/doc/NERDTree.txt).


### Navigation / Search - fzf, ripgrep

For navigation I use FZF. It is a generic command-line fuzzy finder. It can be used to search in any list: files, command history, processes, hostnames, bookmarks, git commits.

From the inside of editor I use it to search for file in the project, to navigate between opened buffers, and to filter search by content results.

<img src="/static/images/developer_enviroment_productivity/nvim_fzf_search.gif" size="medium" round shadow />

Search by content
Go to file by filename 
Go to buffer by buffer name

*Mappings*:
```viml
" open fzf search by filename for buffers
nnoremap <c-p> :Files<cr>
" open fzf search by filename for all files
nnoremap <c-b> :Buffers<cr>
" open fzf ripgrep search by content in all files
nnoremap <c-f> :Rg<cr>

" Rg command, opens FZF, searches by content only from 4th column
command! -bang -nargs=* Rg call fzf#vim#grep('rg --column --line-number --no-heading --color=always --smart-case '.shellescape(<q-args>), 1, {'options': '--delimiter : --nth 4..'}, <bang>0)
```

### Autocomplete - Ycm

### Linting - Ale

To get feedback on sytax / styling problems while typing I use ALE. It is asynchronous lint engine that is fast and works. Has tons of integrations.

```viml
let g:ale_linters = {
      \ 'clojure': ['clj-kondo', 'joker'],
      \ 'typescript': ['eslint', 'tsserver'],
      \ 'javascript': ['eslint', 'tsserver'],
      \ 'rust': ['rls'],
      \ 'yaml': ['yamllint'],
      \ 'python': ['flake8', 'pyls']}

let g:ale_fixers = {
      \ 'typescript': ['prettier', 'eslint'],
      \ 'javascript': ['prettier', 'eslint'],
      \ 'json': ['jq'],
      \ 'rust': ['rustfmt'],
      \ 'scss': ['prettier'],
      \ 'python': ['autopep8', 'yapf']}
```

Mappings:

```viml
nnoremap <leader>al :ALELint<cr>
nnoremap <leader>af :ALEFix<cr>
nnoremap <leader>ad :ALEDetail<cr>
```

## Terminal - Alacritty

<img src="https://raw.githubusercontent.com/jwilm/alacritty/master/extra/logo/alacritty-term%2Bscanlines.svg?sanitize=true" style={{width: '200px'}} round />

My prefered terminal is [Alacritty][Alacritty Github], because it has GPU accelerated rendering (makes my vim redering fly), and provides nothing more than a simple window.

* Tabs - tmux
* Shell - zsh

## Terminal Multiplexer - Tmux

Alacritty is very minimal. I use it in conjunction with with Tmux terminal multiplexer, which provides me with capabilities to have multiple sessions open, to have multiple tabs in each session and with easy navigation between them.

Mappings:

```

ctrl | - split 

```

## Shell - Zsh

[Neovim Github]: https://github.com/neovim/neovim
[VimPlug Github]: https://github.com/junegunn/vim-plug
[Nerdtree Github]: https://github.com/scrooloose/nerdtree
[FZF Github]: https://github.com/junegunn/fzf
[FZF Vim Github]: https://github.com/junegunn/fzf.vim
[Ripgrep Github]: https://github.com/BurntSushi/ripgrep
[YCM Github]: https://github.com/ycm-core/YouCompleteMe
[Ale Github]: https://github.com/dense-analysis/ale
[Vim Fugitive Github]:https://github.com/tpope/vim-fugitive
[Vim GitGutter Github]: https://github.com/airblade/vim-gitgutter

[Alacritty Github]: https://github.com/jwilm/alacritty