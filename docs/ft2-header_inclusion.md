[Docs](ft2-index.md) &raquo; [General Remarks](ft2-toc.md#general-remarks) &raquo; FreeType's header inclusion scheme

-------------------------------

# FreeType's header inclusion scheme

## Synopsis

To be as flexible as possible (and for historical reasons), FreeType uses a very special inclusion scheme to load header files, for example
```
  #include <ft2build.h>

  #include FT_FREETYPE_H
  #include FT_OUTLINE_H
```

A compiler and its preprocessor only needs an include path to find the file `ft2build.h`; the exact locations and names of the other FreeType header files are hidden by &lsquo;<a href="../ft2-header_file_macros/index.html#header_file_macros">Header File Macros</a>&rsquo;, loaded by `ft2build.h`. The API documentation always gives the header macro name needed for a particular function.

