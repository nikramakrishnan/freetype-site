[Docs](ft2-index.md) &raquo; [Error Codes](ft2-toc.md#error-codes) &raquo; Error Enumerations

-------------------------------

# Error Enumerations

## Synopsis

The header file `fterrors.h` (which is automatically included by `freetype.h` defines the handling of FreeType's enumeration constants. It can also be used to generate error message strings with a small macro trick explained below.

**Error Formats**

The configuration macro FT_CONFIG_OPTION_USE_MODULE_ERRORS can be defined in `ftoption.h` in order to make the higher byte indicate the module where the error has happened (this is not compatible with standard builds of FreeType&nbsp;2, however). See the file `ftmoderr.h` for more details.

**Error Message Strings**

Error definitions are set up with special macros that allow client applications to build a table of error message strings. The strings are not included in a normal build of FreeType&nbsp;2 to save space (most client applications do not use them).

To do so, you have to define the following macros before including this file.
```
  FT_ERROR_START_LIST
```

This macro is called before anything else to define the start of the error list. It is followed by several FT_ERROR_DEF calls.
```
  FT_ERROR_DEF( e, v, s )
```

This macro is called to define one single error. &lsquo;e&rsquo; is the error code identifier (e.g., `Invalid_Argument`), &lsquo;v&rsquo; is the error's numerical value, and &lsquo;s&rsquo; is the corresponding error string.
```
  FT_ERROR_END_LIST
```

This macro ends the list.

Additionally, you have to undefine `FTERRORS_H_` before #including this file.

Here is a simple example.
```
  #undef FTERRORS_H_
  #define FT_ERRORDEF( e, v, s )  { e, s },
  #define FT_ERROR_START_LIST     {
  #define FT_ERROR_END_LIST       { 0, NULL } };

  const struct
  {
    int          err_code;
    const char*  err_msg;
  } ft_errors[] =

  #include FT_ERRORS_H
```

Note that `FT_Err_Ok` is _not_ defined with `FT_ERRORDEF` but with `FT_NOERRORDEF`; it is always zero.

