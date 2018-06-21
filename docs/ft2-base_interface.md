[Docs](ft2-index.md) &raquo; [Core API](ft2-toc.md#core-api) &raquo; Base Interface

-------------------------------

# Base Interface

## Synopsis

This section describes the most important public high-level API functions of FreeType&nbsp;2.

## FT_Library

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_LibraryRec_  *<b>FT_Library</b>;
</pre>
</div>


A handle to a FreeType library instance. Each &lsquo;library&rsquo; is completely independent from the others; it is the &lsquo;root&rsquo; of a set of objects like fonts, faces, sizes, etc.

It also embeds a memory manager (see <a href="../ft2-system_interface/index.html#ft_memory">FT_Memory</a>), as well as a scan-line converter object (see <a href="../ft2-raster/index.html#ft_raster">FT_Raster</a>).

In multi-threaded applications it is easiest to use one `FT_Library` object per thread. In case this is too cumbersome, a single `FT_Library` object across threads is possible also (since FreeType version 2.5.6), as long as a mutex lock is used around <a href="../ft2-base_interface/index.html#ft_new_face">FT_New_Face</a> and <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a>.

<h4>note</h4>

Library objects are normally created by <a href="../ft2-base_interface/index.html#ft_init_freetype">FT_Init_FreeType</a>, and destroyed with <a href="../ft2-base_interface/index.html#ft_done_freetype">FT_Done_FreeType</a>. If you need reference-counting (cf. <a href="../ft2-module_management/index.html#ft_reference_library">FT_Reference_Library</a>), use <a href="../ft2-module_management/index.html#ft_new_library">FT_New_Library</a> and <a href="../ft2-module_management/index.html#ft_done_library">FT_Done_Library</a>.

<hr>

## FT_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_FaceRec_*  <b>FT_Face</b>;
</pre>
</div>


A handle to a typographic face object. A face object models a given typeface, in a given style.

<h4>note</h4>

A face object also owns a single <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a> object, as well as one or more <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> objects.

Use <a href="../ft2-base_interface/index.html#ft_new_face">FT_New_Face</a> or <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> to create a new face object from a given filepath or a custom input stream.

Use <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a> to destroy it (along with its slot and sizes).

An `FT_Face` object can only be safely used from one thread at a time. Similarly, creation and destruction of `FT_Face` with the same <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a> object can only be done from one thread at a time. On the other hand, functions like <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> and its siblings are thread-safe and do not need the lock to be held as long as the same `FT_Face` object is not used from multiple threads at the same time.

<h4>also</h4>

See <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> for the publicly accessible fields of a given face object.

<hr>

## FT_Size

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_SizeRec_*  <b>FT_Size</b>;
</pre>
</div>


A handle to an object that models a face scaled to a given character size.

<h4>note</h4>

An <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> has one _active_ <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object that is used by functions like <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> to determine the scaling transformation that in turn is used to load and hint glyphs and metrics.

You can use <a href="../ft2-base_interface/index.html#ft_set_char_size">FT_Set_Char_Size</a>, <a href="../ft2-base_interface/index.html#ft_set_pixel_sizes">FT_Set_Pixel_Sizes</a>, <a href="../ft2-base_interface/index.html#ft_request_size">FT_Request_Size</a> or even <a href="../ft2-base_interface/index.html#ft_select_size">FT_Select_Size</a> to change the content (i.e., the scaling values) of the active <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a>.

You can use <a href="../ft2-sizes_management/index.html#ft_new_size">FT_New_Size</a> to create additional size objects for a given <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>, but they won't be used by other functions until you activate it through <a href="../ft2-sizes_management/index.html#ft_activate_size">FT_Activate_Size</a>. Only one size can be activated at any given time per face.

<h4>also</h4>

See <a href="../ft2-base_interface/index.html#ft_sizerec">FT_SizeRec</a> for the publicly accessible fields of a given size object.

<hr>

## FT_GlyphSlot

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_GlyphSlotRec_*  <b>FT_GlyphSlot</b>;
</pre>
</div>


A handle to a given &lsquo;glyph slot&rsquo;. A slot is a container that can hold any of the glyphs contained in its parent face.

In other words, each time you call <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> or <a href="../ft2-base_interface/index.html#ft_load_char">FT_Load_Char</a>, the slot's content is erased by the new glyph data, i.e., the glyph's metrics, its image (bitmap or outline), and other control information.

<h4>also</h4>

See <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a> for the publicly accessible glyph fields.

<hr>

## FT_CharMap

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_CharMapRec_*  <b>FT_CharMap</b>;
</pre>
</div>


A handle to a character map (usually abbreviated to &lsquo;charmap&rsquo;). A charmap is used to translate character codes in a given encoding into glyph indexes for its parent's face. Some font formats may provide several charmaps per font.

Each face object owns zero or more charmaps, but only one of them can be &lsquo;active&rsquo;, providing the data used by <a href="../ft2-base_interface/index.html#ft_get_char_index">FT_Get_Char_Index</a> or <a href="../ft2-base_interface/index.html#ft_load_char">FT_Load_Char</a>.

The list of available charmaps in a face is available through the `face->num_charmaps` and `face->charmaps` fields of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a>.

The currently active charmap is available as `face->charmap`. You should call <a href="../ft2-base_interface/index.html#ft_set_charmap">FT_Set_Charmap</a> to change it.

<h4>note</h4>

When a new face is created (either through <a href="../ft2-base_interface/index.html#ft_new_face">FT_New_Face</a> or <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a>), the library looks for a Unicode charmap within the list and automatically activates it. If there is no Unicode charmap, FreeType doesn't set an &lsquo;active&rsquo; charmap.

<h4>also</h4>

See <a href="../ft2-base_interface/index.html#ft_charmaprec">FT_CharMapRec</a> for the publicly accessible fields of a given character map.

<hr>

## FT_Encoding

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">enum</span>  FT_Encoding_
  {
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_none">FT_ENCODING_NONE</a>, 0, 0, 0, 0 ),

    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_ms_symbol">FT_ENCODING_MS_SYMBOL</a>, 's', 'y', 'm', 'b' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_unicode">FT_ENCODING_UNICODE</a>,   'u', 'n', 'i', 'c' ),

    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_sjis">FT_ENCODING_SJIS</a>,    's', 'j', 'i', 's' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_prc">FT_ENCODING_PRC</a>,     'g', 'b', ' ', ' ' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_big5">FT_ENCODING_BIG5</a>,    'b', 'i', 'g', '5' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_wansung">FT_ENCODING_WANSUNG</a>, 'w', 'a', 'n', 's' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_johab">FT_ENCODING_JOHAB</a>,   'j', 'o', 'h', 'a' ),

    /* for backward compatibility */
    FT_ENCODING_GB2312     = <a href="../ft2-base_interface/index.html#ft_encoding_prc">FT_ENCODING_PRC</a>,
    <a href="../ft2-base_interface/index.html#ft_encoding_ms_sjis">FT_ENCODING_MS_SJIS</a>    = <a href="../ft2-base_interface/index.html#ft_encoding_sjis">FT_ENCODING_SJIS</a>,
    <a href="../ft2-base_interface/index.html#ft_encoding_ms_gb2312">FT_ENCODING_MS_GB2312</a>  = <a href="../ft2-base_interface/index.html#ft_encoding_prc">FT_ENCODING_PRC</a>,
    <a href="../ft2-base_interface/index.html#ft_encoding_ms_big5">FT_ENCODING_MS_BIG5</a>    = <a href="../ft2-base_interface/index.html#ft_encoding_big5">FT_ENCODING_BIG5</a>,
    <a href="../ft2-base_interface/index.html#ft_encoding_ms_wansung">FT_ENCODING_MS_WANSUNG</a> = <a href="../ft2-base_interface/index.html#ft_encoding_wansung">FT_ENCODING_WANSUNG</a>,
    <a href="../ft2-base_interface/index.html#ft_encoding_ms_johab">FT_ENCODING_MS_JOHAB</a>   = <a href="../ft2-base_interface/index.html#ft_encoding_johab">FT_ENCODING_JOHAB</a>,

    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_adobe_standard">FT_ENCODING_ADOBE_STANDARD</a>, 'A', 'D', 'O', 'B' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_adobe_expert">FT_ENCODING_ADOBE_EXPERT</a>,   'A', 'D', 'B', 'E' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_adobe_custom">FT_ENCODING_ADOBE_CUSTOM</a>,   'A', 'D', 'B', 'C' ),
    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_adobe_latin_1">FT_ENCODING_ADOBE_LATIN_1</a>,  'l', 'a', 't', '1' ),

    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_old_latin_2">FT_ENCODING_OLD_LATIN_2</a>, 'l', 'a', 't', '2' ),

    <a href="../ft2-base_interface/index.html#ft_enc_tag">FT_ENC_TAG</a>( <a href="../ft2-base_interface/index.html#ft_encoding_apple_roman">FT_ENCODING_APPLE_ROMAN</a>, 'a', 'r', 'm', 'n' )

  } <b>FT_Encoding</b>;


  /* these constants are deprecated; use the corresponding `<b>FT_Encoding</b>' */
  /* values instead                                                      */
#<span class="keyword">define</span> ft_encoding_none            <a href="../ft2-base_interface/index.html#ft_encoding_none">FT_ENCODING_NONE</a>
#<span class="keyword">define</span> ft_encoding_unicode         <a href="../ft2-base_interface/index.html#ft_encoding_unicode">FT_ENCODING_UNICODE</a>
#<span class="keyword">define</span> ft_encoding_symbol          <a href="../ft2-base_interface/index.html#ft_encoding_ms_symbol">FT_ENCODING_MS_SYMBOL</a>
#<span class="keyword">define</span> ft_encoding_latin_1         <a href="../ft2-base_interface/index.html#ft_encoding_adobe_latin_1">FT_ENCODING_ADOBE_LATIN_1</a>
#<span class="keyword">define</span> ft_encoding_latin_2         <a href="../ft2-base_interface/index.html#ft_encoding_old_latin_2">FT_ENCODING_OLD_LATIN_2</a>
#<span class="keyword">define</span> ft_encoding_sjis            <a href="../ft2-base_interface/index.html#ft_encoding_sjis">FT_ENCODING_SJIS</a>
#<span class="keyword">define</span> ft_encoding_gb2312          <a href="../ft2-base_interface/index.html#ft_encoding_prc">FT_ENCODING_PRC</a>
#<span class="keyword">define</span> ft_encoding_big5            <a href="../ft2-base_interface/index.html#ft_encoding_big5">FT_ENCODING_BIG5</a>
#<span class="keyword">define</span> ft_encoding_wansung         <a href="../ft2-base_interface/index.html#ft_encoding_wansung">FT_ENCODING_WANSUNG</a>
#<span class="keyword">define</span> ft_encoding_johab           <a href="../ft2-base_interface/index.html#ft_encoding_johab">FT_ENCODING_JOHAB</a>

#<span class="keyword">define</span> ft_encoding_adobe_standard  <a href="../ft2-base_interface/index.html#ft_encoding_adobe_standard">FT_ENCODING_ADOBE_STANDARD</a>
#<span class="keyword">define</span> ft_encoding_adobe_expert    <a href="../ft2-base_interface/index.html#ft_encoding_adobe_expert">FT_ENCODING_ADOBE_EXPERT</a>
#<span class="keyword">define</span> ft_encoding_adobe_custom    <a href="../ft2-base_interface/index.html#ft_encoding_adobe_custom">FT_ENCODING_ADOBE_CUSTOM</a>
#<span class="keyword">define</span> ft_encoding_apple_roman     <a href="../ft2-base_interface/index.html#ft_encoding_apple_roman">FT_ENCODING_APPLE_ROMAN</a>
</pre>
</div>


An enumeration to specify character sets supported by charmaps. Used in the <a href="../ft2-base_interface/index.html#ft_select_charmap">FT_Select_Charmap</a> API function.

<h4>note</h4>

Despite the name, this enumeration lists specific character repertories (i.e., charsets), and not text encoding methods (e.g., UTF-8, UTF-16, etc.).

Other encodings might be defined in the future.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_encoding_none">FT_ENCODING_NONE</td><td class="desc">
<p>The encoding value&nbsp;0 is reserved.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_unicode">FT_ENCODING_UNICODE</td><td class="desc">
<p>The Unicode character set. This value covers all versions of the Unicode repertoire, including ASCII and Latin-1. Most fonts include a Unicode charmap, but not all of them.</p>
<p>For example, if you want to access Unicode value U+1F028 (and the font contains it), use value 0x1F028 as the input value for <a href="../ft2-base_interface/index.html#ft_get_char_index">FT_Get_Char_Index</a>.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_symbol">FT_ENCODING_MS_SYMBOL</td><td class="desc">
<p>Microsoft Symbol encoding, used to encode mathematical symbols and wingdings. For more information, see &lsquo;<a href="https://www.microsoft.com/typography/otspec/recom.htm">https://www.microsoft.com/typography/otspec/recom.htm</a>&rsquo;, &lsquo;<a href="http://www.kostis.net/charsets/symbol.htm">http://www.kostis.net/charsets/symbol.htm</a>&rsquo;, and &lsquo;<a href="http://www.kostis.net/charsets/wingding.htm">http://www.kostis.net/charsets/wingding.htm</a>&rsquo;.</p>
<p>This encoding uses character codes from the PUA (Private Unicode Area) in the range U+F020-U+F0FF.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_sjis">FT_ENCODING_SJIS</td><td class="desc">
<p>Shift JIS encoding for Japanese. More info at &lsquo;<a href="https://en.wikipedia.org/wiki/Shift_JIS">https://en.wikipedia.org/wiki/Shift_JIS</a>&rsquo;. See note on multi-byte encodings below.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_prc">FT_ENCODING_PRC</td><td class="desc">
<p>Corresponds to encoding systems mainly for Simplified Chinese as used in People's Republic of China (PRC). The encoding layout is based on GB&nbsp;2312 and its supersets GBK and GB&nbsp;18030.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_big5">FT_ENCODING_BIG5</td><td class="desc">
<p>Corresponds to an encoding system for Traditional Chinese as used in Taiwan and Hong Kong.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_wansung">FT_ENCODING_WANSUNG</td><td class="desc">
<p>Corresponds to the Korean encoding system known as Extended Wansung (MS Windows code page 949). For more information see &lsquo;<a href="https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit949.txt">https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit949.txt</a>&rsquo;.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_johab">FT_ENCODING_JOHAB</td><td class="desc">
<p>The Korean standard character set (KS&nbsp;C 5601-1992), which corresponds to MS Windows code page 1361. This character set includes all possible Hangul character combinations.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_adobe_latin_1">FT_ENCODING_ADOBE_LATIN_1</td><td class="desc">
<p>Corresponds to a Latin-1 encoding as defined in a Type&nbsp;1 PostScript font. It is limited to 256 character codes.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_adobe_standard">FT_ENCODING_ADOBE_STANDARD</td><td class="desc">
<p>Adobe Standard encoding, as found in Type&nbsp;1, CFF, and OpenType/CFF fonts. It is limited to 256 character codes.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_adobe_expert">FT_ENCODING_ADOBE_EXPERT</td><td class="desc">
<p>Adobe Expert encoding, as found in Type&nbsp;1, CFF, and OpenType/CFF fonts. It is limited to 256 character codes.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_adobe_custom">FT_ENCODING_ADOBE_CUSTOM</td><td class="desc">
<p>Corresponds to a custom encoding, as found in Type&nbsp;1, CFF, and OpenType/CFF fonts. It is limited to 256 character codes.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_apple_roman">FT_ENCODING_APPLE_ROMAN</td><td class="desc">
<p>Apple roman encoding. Many TrueType and OpenType fonts contain a charmap for this 8-bit encoding, since older versions of Mac OS are able to use it.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_old_latin_2">FT_ENCODING_OLD_LATIN_2</td><td class="desc">
<p>This value is deprecated and was neither used nor reported by FreeType. Don't use or test for it.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_sjis">FT_ENCODING_MS_SJIS</td><td class="desc">
<p>Same as FT_ENCODING_SJIS. Deprecated.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_gb2312">FT_ENCODING_MS_GB2312</td><td class="desc">
<p>Same as FT_ENCODING_PRC. Deprecated.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_big5">FT_ENCODING_MS_BIG5</td><td class="desc">
<p>Same as FT_ENCODING_BIG5. Deprecated.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_wansung">FT_ENCODING_MS_WANSUNG</td><td class="desc">
<p>Same as FT_ENCODING_WANSUNG. Deprecated.</p>
</td></tr>
<tr><td class="val" id="ft_encoding_ms_johab">FT_ENCODING_MS_JOHAB</td><td class="desc">
<p>Same as FT_ENCODING_JOHAB. Deprecated.</p>
</td></tr>
</table>

<h4>note</h4>

By default, FreeType enables a Unicode charmap and tags it with FT_ENCODING_UNICODE when it is either provided or can be generated from PostScript glyph name dictionaries in the font file. All other encodings are considered legacy and tagged only if explicitly defined in the font file. Otherwise, FT_ENCODING_NONE is used.

FT_ENCODING_NONE is set by the BDF and PCF drivers if the charmap is neither Unicode nor ISO-8859-1 (otherwise it is set to FT_ENCODING_UNICODE). Use <a href="../ft2-bdf_fonts/index.html#ft_get_bdf_charset_id">FT_Get_BDF_Charset_ID</a> to find out which encoding is really present. If, for example, the `cs_registry` field is &lsquo;KOI8&rsquo; and the `cs_encoding` field is &lsquo;R&rsquo;, the font is encoded in KOI8-R.

FT_ENCODING_NONE is always set (with a single exception) by the winfonts driver. Use <a href="../ft2-winfnt_fonts/index.html#ft_get_winfnt_header">FT_Get_WinFNT_Header</a> and examine the &lsquo;charset&rsquo; field of the <a href="../ft2-winfnt_fonts/index.html#ft_winfnt_headerrec">FT_WinFNT_HeaderRec</a> structure to find out which encoding is really present. For example, <a href="../ft2-winfnt_fonts/index.html#ft_winfnt_id_xxx">FT_WinFNT_ID_CP1251</a> (204) means Windows code page 1251 (for Russian).

FT_ENCODING_NONE is set if `platform_id` is <a href="../ft2-truetype_tables/index.html#tt_platform_xxx">TT_PLATFORM_MACINTOSH</a> and `encoding_id` is not `TT_MAC_ID_ROMAN` (otherwise it is set to FT_ENCODING_APPLE_ROMAN).

If `platform_id` is <a href="../ft2-truetype_tables/index.html#tt_platform_xxx">TT_PLATFORM_MACINTOSH</a>, use the function <a href="../ft2-truetype_tables/index.html#ft_get_cmap_language_id">FT_Get_CMap_Language_ID</a> to query the Mac language ID that may be needed to be able to distinguish Apple encoding variants. See

<https://www.unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt>

to get an idea how to do that. Basically, if the language ID is&nbsp;0, don't use it, otherwise subtract 1 from the language ID. Then examine `encoding_id`. If, for example, `encoding_id` is `TT_MAC_ID_ROMAN` and the language ID (minus&nbsp;1) is `TT_MAC_LANGID_GREEK`, it is the Greek encoding, not Roman. `TT_MAC_ID_ARABIC` with `TT_MAC_LANGID_FARSI` means the Farsi variant the Arabic encoding.

<hr>

## FT_ENC_TAG

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">ifndef</span> <b>FT_ENC_TAG</b>
#<span class="keyword">define</span> <b>FT_ENC_TAG</b>( value, a, b, c, d )         \
          value = ( ( (<a href="../ft2-basic_types/index.html#ft_uint32">FT_UInt32</a>)(a) &lt;&lt; 24 ) |  \
                    ( (<a href="../ft2-basic_types/index.html#ft_uint32">FT_UInt32</a>)(b) &lt;&lt; 16 ) |  \
                    ( (<a href="../ft2-basic_types/index.html#ft_uint32">FT_UInt32</a>)(c) &lt;&lt;  8 ) |  \
                      (<a href="../ft2-basic_types/index.html#ft_uint32">FT_UInt32</a>)(d)         )

#<span class="keyword">endif</span> /* <b>FT_ENC_TAG</b> */
</pre>
</div>


This macro converts four-letter tags into an unsigned long. It is used to define &lsquo;encoding&rsquo; identifiers (see <a href="../ft2-base_interface/index.html#ft_encoding">FT_Encoding</a>).

<h4>note</h4>

Since many 16-bit compilers don't like 32-bit enumerations, you should redefine this macro in case of problems to something like this:
```
  #define FT_ENC_TAG( value, a, b, c, d )  value
```

to get a simple enumeration without assigning special numbers.

<hr>

## FT_FaceRec

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_FaceRec_
  {
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>           num_faces;
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>           face_index;

    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>           face_flags;
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>           style_flags;

    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>           num_glyphs;

    <a href="../ft2-basic_types/index.html#ft_string">FT_String</a>*        family_name;
    <a href="../ft2-basic_types/index.html#ft_string">FT_String</a>*        style_name;

    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>            num_fixed_sizes;
    <a href="../ft2-base_interface/index.html#ft_bitmap_size">FT_Bitmap_Size</a>*   available_sizes;

    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>            num_charmaps;
    <a href="../ft2-base_interface/index.html#ft_charmap">FT_CharMap</a>*       charmaps;

    <a href="../ft2-basic_types/index.html#ft_generic">FT_Generic</a>        generic;

    /*# The following member variables (down to `underline_thickness') */
    /*# are only relevant to scalable outlines; cf. @<a href="../ft2-base_interface/index.html#ft_bitmap_size">FT_Bitmap_Size</a>    */
    /*# for bitmap fonts.                                              */
    <a href="../ft2-basic_types/index.html#ft_bbox">FT_BBox</a>           bbox;

    <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a>         units_per_EM;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          ascender;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          descender;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          height;

    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          max_advance_width;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          max_advance_height;

    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          underline_position;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>          underline_thickness;

    <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a>      glyph;
    <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a>           size;
    <a href="../ft2-base_interface/index.html#ft_charmap">FT_CharMap</a>        charmap;

    /*@private begin */

    <a href="../ft2-module_management/index.html#ft_driver">FT_Driver</a>         driver;
    <a href="../ft2-system_interface/index.html#ft_memory">FT_Memory</a>         memory;
    <a href="../ft2-system_interface/index.html#ft_stream">FT_Stream</a>         stream;

    <a href="../ft2-list_processing/index.html#ft_listrec">FT_ListRec</a>        sizes_list;

    <a href="../ft2-basic_types/index.html#ft_generic">FT_Generic</a>        autohint;   /* face-specific auto-hinter data */
    <span class="keyword">void</span>*             extensions; /* unused                         */

    <a href="../ft2-base_interface/index.html#ft_face_internal">FT_Face_Internal</a>  internal;

    /*@private end */

  } <b>FT_FaceRec</b>;
</pre>
</div>


FreeType root face class structure. A face object models a typeface in a font file.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="num_faces">num_faces</td><td class="desc">
<p>The number of faces in the font file. Some font formats can have multiple faces in a single font file.</p>
</td></tr>
<tr><td class="val" id="face_index">face_index</td><td class="desc">
<p>This field holds two different values. Bits 0-15 are the index of the face in the font file (starting with value&nbsp;0). They are set to&nbsp;0 if there is only one face in the font file.</p>
<p>[Since 2.6.1] Bits 16-30 are relevant to GX and OpenType variation fonts only, holding the named instance index for the current face index (starting with value&nbsp;1; value&nbsp;0 indicates font access without a named instance). For non-variation fonts, bits 16-30 are ignored. If we have the third named instance of face&nbsp;4, say, <code>face_index</code> is set to 0x00030004.</p>
<p>Bit 31 is always zero (this is, <code>face_index</code> is always a positive value).</p>
<p>[Since 2.9] Changing the design coordinates with <a href="../ft2-multiple_masters/index.html#ft_set_var_design_coordinates">FT_Set_Var_Design_Coordinates</a> or <a href="../ft2-multiple_masters/index.html#ft_set_var_blend_coordinates">FT_Set_Var_Blend_Coordinates</a> does not influence the named instance index value (only <a href="../ft2-multiple_masters/index.html#ft_set_named_instance">FT_Set_Named_Instance</a> does that).</p>
</td></tr>
<tr><td class="val" id="face_flags">face_flags</td><td class="desc">
<p>A set of bit flags that give important information about the face; see <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_XXX</a> for the details.</p>
</td></tr>
<tr><td class="val" id="style_flags">style_flags</td><td class="desc">
<p>The lower 16&nbsp;bits contain a set of bit flags indicating the style of the face; see <a href="../ft2-base_interface/index.html#ft_style_flag_xxx">FT_STYLE_FLAG_XXX</a> for the details.</p>
<p>[Since 2.6.1] Bits 16-30 hold the number of named instances available for the current face if we have a GX or OpenType variation (sub)font. Bit 31 is always zero (this is, <code>style_flags</code> is always a positive value). Note that a variation font has always at least one named instance, namely the default instance.</p>
</td></tr>
<tr><td class="val" id="num_glyphs">num_glyphs</td><td class="desc">
<p>The number of glyphs in the face. If the face is scalable and has sbits (see <code>num_fixed_sizes</code>), it is set to the number of outline glyphs.</p>
<p>For CID-keyed fonts (not in an SFNT wrapper) this value gives the highest CID used in the font.</p>
</td></tr>
<tr><td class="val" id="family_name">family_name</td><td class="desc">
<p>The face's family name. This is an ASCII string, usually in English, that describes the typeface's family (like &lsquo;Times New Roman&rsquo;, &lsquo;Bodoni&rsquo;, &lsquo;Garamond&rsquo;, etc). This is a least common denominator used to list fonts. Some formats (TrueType &amp; OpenType) provide localized and Unicode versions of this string. Applications should use the format specific interface to access them. Can be NULL (e.g., in fonts embedded in a PDF file).</p>
<p>In case the font doesn't provide a specific family name entry, FreeType tries to synthesize one, deriving it from other name entries.</p>
</td></tr>
<tr><td class="val" id="style_name">style_name</td><td class="desc">
<p>The face's style name. This is an ASCII string, usually in English, that describes the typeface's style (like &lsquo;Italic&rsquo;, &lsquo;Bold&rsquo;, &lsquo;Condensed&rsquo;, etc). Not all font formats provide a style name, so this field is optional, and can be set to NULL. As for <code>family_name</code>, some formats provide localized and Unicode versions of this string. Applications should use the format specific interface to access them.</p>
</td></tr>
<tr><td class="val" id="num_fixed_sizes">num_fixed_sizes</td><td class="desc">
<p>The number of bitmap strikes in the face. Even if the face is scalable, there might still be bitmap strikes, which are called &lsquo;sbits&rsquo; in that case.</p>
</td></tr>
<tr><td class="val" id="available_sizes">available_sizes</td><td class="desc">
<p>An array of <a href="../ft2-base_interface/index.html#ft_bitmap_size">FT_Bitmap_Size</a> for all bitmap strikes in the face. It is set to NULL if there is no bitmap strike.</p>
<p>Note that FreeType tries to sanitize the strike data since they are sometimes sloppy or incorrect, but this can easily fail.</p>
</td></tr>
<tr><td class="val" id="num_charmaps">num_charmaps</td><td class="desc">
<p>The number of charmaps in the face.</p>
</td></tr>
<tr><td class="val" id="charmaps">charmaps</td><td class="desc">
<p>An array of the charmaps of the face.</p>
</td></tr>
<tr><td class="val" id="generic">generic</td><td class="desc">
<p>A field reserved for client uses. See the <a href="../ft2-basic_types/index.html#ft_generic">FT_Generic</a> type description.</p>
</td></tr>
<tr><td class="val" id="bbox">bbox</td><td class="desc">
<p>The font bounding box. Coordinates are expressed in font units (see <code>units_per_EM</code>). The box is large enough to contain any glyph from the font. Thus, <code>bbox.yMax</code> can be seen as the &lsquo;maximum ascender&rsquo;, and <code>bbox.yMin</code> as the &lsquo;minimum descender&rsquo;. Only relevant for scalable formats.</p>
<p>Note that the bounding box might be off by (at least) one pixel for hinted fonts. See <a href="../ft2-base_interface/index.html#ft_size_metrics">FT_Size_Metrics</a> for further discussion.</p>
</td></tr>
<tr><td class="val" id="units_per_em">units_per_EM</td><td class="desc">
<p>The number of font units per EM square for this face. This is typically 2048 for TrueType fonts, and 1000 for Type&nbsp;1 fonts. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="ascender">ascender</td><td class="desc">
<p>The typographic ascender of the face, expressed in font units. For font formats not having this information, it is set to <code>bbox.yMax</code>. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="descender">descender</td><td class="desc">
<p>The typographic descender of the face, expressed in font units. For font formats not having this information, it is set to <code>bbox.yMin</code>. Note that this field is negative for values below the baseline. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="height">height</td><td class="desc">
<p>This value is the vertical distance between two consecutive baselines, expressed in font units. It is always positive. Only relevant for scalable formats.</p>
<p>If you want the global glyph height, use &lsquo;ascender - descender&rsquo;.</p>
</td></tr>
<tr><td class="val" id="max_advance_width">max_advance_width</td><td class="desc">
<p>The maximum advance width, in font units, for all glyphs in this face. This can be used to make word wrapping computations faster. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="max_advance_height">max_advance_height</td><td class="desc">
<p>The maximum advance height, in font units, for all glyphs in this face. This is only relevant for vertical layouts, and is set to &lsquo;height&rsquo; for fonts that do not provide vertical metrics. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="underline_position">underline_position</td><td class="desc">
<p>The position, in font units, of the underline line for this face. It is the center of the underlining stem. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="underline_thickness">underline_thickness</td><td class="desc">
<p>The thickness, in font units, of the underline for this face. Only relevant for scalable formats.</p>
</td></tr>
<tr><td class="val" id="glyph">glyph</td><td class="desc">
<p>The face's associated glyph slot(s).</p>
</td></tr>
<tr><td class="val" id="size">size</td><td class="desc">
<p>The current active size for this face.</p>
</td></tr>
<tr><td class="val" id="charmap">charmap</td><td class="desc">
<p>The current active charmap for this face.</p>
</td></tr>
</table>

<h4>note</h4>

Fields may be changed after a call to <a href="../ft2-base_interface/index.html#ft_attach_file">FT_Attach_File</a> or <a href="../ft2-base_interface/index.html#ft_attach_stream">FT_Attach_Stream</a>.

For an OpenType variation font, the values of the following fields can change after a call to <a href="../ft2-multiple_masters/index.html#ft_set_var_design_coordinates">FT_Set_Var_Design_Coordinates</a> (and friends) if the font contains an &lsquo;MVAR&rsquo; table: &lsquo;ascender&rsquo;, &lsquo;descender&rsquo;, &lsquo;height&rsquo;, `underline_position`, and `underline_thickness`.

Especially for TrueType fonts see also the documentation for <a href="../ft2-base_interface/index.html#ft_size_metrics">FT_Size_Metrics</a>.

<hr>

## FT_HAS_HORIZONTAL

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_HORIZONTAL</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_horizontal">FT_FACE_FLAG_HORIZONTAL</a> )
</pre>
</div>


A macro that returns true whenever a face object contains horizontal metrics (this is true for all font formats though).

<h4>also</h4>

<a href="../ft2-base_interface/index.html#ft_has_vertical">FT_HAS_VERTICAL</a> can be used to check for vertical metrics.

<hr>

## FT_HAS_VERTICAL

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_VERTICAL</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_vertical">FT_FACE_FLAG_VERTICAL</a> )
</pre>
</div>


A macro that returns true whenever a face object contains real vertical metrics (and not only synthesized ones).

<hr>

## FT_HAS_KERNING

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_KERNING</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_kerning">FT_FACE_FLAG_KERNING</a> )
</pre>
</div>


A macro that returns true whenever a face object contains kerning data that can be accessed with <a href="../ft2-base_interface/index.html#ft_get_kerning">FT_Get_Kerning</a>.

<hr>

## FT_HAS_FIXED_SIZES

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_FIXED_SIZES</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_fixed_sizes">FT_FACE_FLAG_FIXED_SIZES</a> )
</pre>
</div>


A macro that returns true whenever a face object contains some embedded bitmaps. See the `available_sizes` field of the <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> structure.

<hr>

## FT_HAS_GLYPH_NAMES

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_GLYPH_NAMES</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_glyph_names">FT_FACE_FLAG_GLYPH_NAMES</a> )
</pre>
</div>


A macro that returns true whenever a face object contains some glyph names that can be accessed through <a href="../ft2-base_interface/index.html#ft_get_glyph_name">FT_Get_Glyph_Name</a>.

<hr>

## FT_HAS_COLOR

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_COLOR</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_color">FT_FACE_FLAG_COLOR</a> )
</pre>
</div>


A macro that returns true whenever a face object contains tables for color glyphs.

<h4>since</h4>

2.5.1

<hr>

## FT_HAS_MULTIPLE_MASTERS

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_MULTIPLE_MASTERS</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_multiple_masters">FT_FACE_FLAG_MULTIPLE_MASTERS</a> )
</pre>
</div>


A macro that returns true whenever a face object contains some multiple masters. The functions provided by <a href="../ft2-header_file_macros/index.html#ft_multiple_masters_h">FT_MULTIPLE_MASTERS_H</a> are then available to choose the exact design you want.

<hr>

## FT_IS_SFNT

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_SFNT</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_sfnt">FT_FACE_FLAG_SFNT</a> )
</pre>
</div>


A macro that returns true whenever a face object contains a font whose format is based on the SFNT storage scheme. This usually means: TrueType fonts, OpenType fonts, as well as SFNT-based embedded bitmap fonts.

If this macro is true, all functions defined in <a href="../ft2-header_file_macros/index.html#ft_sfnt_names_h">FT_SFNT_NAMES_H</a> and <a href="../ft2-header_file_macros/index.html#ft_truetype_tables_h">FT_TRUETYPE_TABLES_H</a> are available.

<hr>

## FT_IS_SCALABLE

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_SCALABLE</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_scalable">FT_FACE_FLAG_SCALABLE</a> )
</pre>
</div>


A macro that returns true whenever a face object contains a scalable font face (true for TrueType, Type&nbsp;1, Type&nbsp;42, CID, OpenType/CFF, and PFR font formats).

<hr>

## FT_IS_FIXED_WIDTH

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_FIXED_WIDTH</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_fixed_width">FT_FACE_FLAG_FIXED_WIDTH</a> )
</pre>
</div>


A macro that returns true whenever a face object contains a font face that contains fixed-width (or &lsquo;monospace&rsquo;, &lsquo;fixed-pitch&rsquo;, etc.) glyphs.

<hr>

## FT_IS_CID_KEYED

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_CID_KEYED</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_cid_keyed">FT_FACE_FLAG_CID_KEYED</a> )
</pre>
</div>


A macro that returns true whenever a face object contains a CID-keyed font. See the discussion of <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_CID_KEYED</a> for more details.

If this macro is true, all functions defined in <a href="../ft2-header_file_macros/index.html#ft_cid_h">FT_CID_H</a> are available.

<hr>

## FT_IS_TRICKY

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_TRICKY</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_tricky">FT_FACE_FLAG_TRICKY</a> )
</pre>
</div>


A macro that returns true whenever a face represents a &lsquo;tricky&rsquo; font. See the discussion of <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_TRICKY</a> for more details.

<hr>

## FT_IS_NAMED_INSTANCE

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_NAMED_INSTANCE</b>( face ) \
          ( (face)-&gt;face_index &amp; 0x7FFF0000L )
</pre>
</div>


A macro that returns true whenever a face object is a named instance of a GX or OpenType variation font.

[Since 2.9] Changing the design coordinates with <a href="../ft2-multiple_masters/index.html#ft_set_var_design_coordinates">FT_Set_Var_Design_Coordinates</a> or <a href="../ft2-multiple_masters/index.html#ft_set_var_blend_coordinates">FT_Set_Var_Blend_Coordinates</a> does not influence the return value of this macro (only <a href="../ft2-multiple_masters/index.html#ft_set_named_instance">FT_Set_Named_Instance</a> does that).

<h4>since</h4>

2.7

<hr>

## FT_IS_VARIATION

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_IS_VARIATION</b>( face ) \
          ( (face)-&gt;face_flags &amp; <a href="../ft2-base_interface/index.html#ft_face_flag_variation">FT_FACE_FLAG_VARIATION</a> )
</pre>
</div>


A macro that returns true whenever a face object has been altered by <a href="../ft2-multiple_masters/index.html#ft_set_mm_design_coordinates">FT_Set_MM_Design_Coordinates</a>, <a href="../ft2-multiple_masters/index.html#ft_set_var_design_coordinates">FT_Set_Var_Design_Coordinates</a>, or <a href="../ft2-multiple_masters/index.html#ft_set_var_blend_coordinates">FT_Set_Var_Blend_Coordinates</a>.

<h4>since</h4>

2.9

<hr>

## FT_SizeRec

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_SizeRec_
  {
    <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>           face;      /* parent face object              */
    <a href="../ft2-basic_types/index.html#ft_generic">FT_Generic</a>        generic;   /* generic pointer for client uses */
    <a href="../ft2-base_interface/index.html#ft_size_metrics">FT_Size_Metrics</a>   metrics;   /* size metrics                    */
    <a href="../ft2-base_interface/index.html#ft_size_internal">FT_Size_Internal</a>  internal;

  } <b>FT_SizeRec</b>;
</pre>
</div>


FreeType root size class structure. A size object models a face object at a given size.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>Handle to the parent face object.</p>
</td></tr>
<tr><td class="val" id="generic">generic</td><td class="desc">
<p>A typeless pointer, unused by the FreeType library or any of its drivers. It can be used by client applications to link their own data to each size object.</p>
</td></tr>
<tr><td class="val" id="metrics">metrics</td><td class="desc">
<p>Metrics for this size object. This field is read-only.</p>
</td></tr>
</table>

<hr>

## FT_Size_Metrics

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Size_Metrics_
  {
    <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a>  x_ppem;      /* horizontal pixels per EM               */
    <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a>  y_ppem;      /* vertical pixels per EM                 */

    <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>   x_scale;     /* scaling values used to convert font    */
    <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>   y_scale;     /* units to 26.6 fractional pixels        */

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>     ascender;    /* ascender in 26.6 frac. pixels          */
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>     descender;   /* descender in 26.6 frac. pixels         */
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>     height;      /* text height in 26.6 frac. pixels       */
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>     max_advance; /* max horizontal advance, in 26.6 pixels */

  } <b>FT_Size_Metrics</b>;
</pre>
</div>


The size metrics structure gives the metrics of a size object.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="x_ppem">x_ppem</td><td class="desc">
<p>The width of the scaled EM square in pixels, hence the term &lsquo;ppem&rsquo; (pixels per EM). It is also referred to as &lsquo;nominal width&rsquo;.</p>
</td></tr>
<tr><td class="val" id="y_ppem">y_ppem</td><td class="desc">
<p>The height of the scaled EM square in pixels, hence the term &lsquo;ppem&rsquo; (pixels per EM). It is also referred to as &lsquo;nominal height&rsquo;.</p>
</td></tr>
<tr><td class="val" id="x_scale">x_scale</td><td class="desc">
<p>A 16.16 fractional scaling value to convert horizontal metrics from font units to 26.6 fractional pixels. Only relevant for scalable font formats.</p>
</td></tr>
<tr><td class="val" id="y_scale">y_scale</td><td class="desc">
<p>A 16.16 fractional scaling value to convert vertical metrics from font units to 26.6 fractional pixels. Only relevant for scalable font formats.</p>
</td></tr>
<tr><td class="val" id="ascender">ascender</td><td class="desc">
<p>The ascender in 26.6 fractional pixels, rounded up to an integer value. See <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> for the details.</p>
</td></tr>
<tr><td class="val" id="descender">descender</td><td class="desc">
<p>The descender in 26.6 fractional pixels, rounded down to an integer value. See <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> for the details.</p>
</td></tr>
<tr><td class="val" id="height">height</td><td class="desc">
<p>The height in 26.6 fractional pixels, rounded to an integer value. See <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> for the details.</p>
</td></tr>
<tr><td class="val" id="max_advance">max_advance</td><td class="desc">
<p>The maximum advance width in 26.6 fractional pixels, rounded to an integer value. See <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> for the details.</p>
</td></tr>
</table>

<h4>note</h4>

The scaling values, if relevant, are determined first during a size changing operation. The remaining fields are then set by the driver. For scalable formats, they are usually set to scaled values of the corresponding fields in <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a>. Some values like ascender or descender are rounded for historical reasons; more precise values (for outline fonts) can be derived by scaling the corresponding <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> values manually, with code similar to the following.
```
  scaled_ascender = FT_MulFix( face->ascender,
                               size_metrics->y_scale );
```

Note that due to glyph hinting and the selected rendering mode these values are usually not exact; consequently, they must be treated as unreliable with an error margin of at least one pixel!

Indeed, the only way to get the exact metrics is to render _all_ glyphs. As this would be a definite performance hit, it is up to client applications to perform such computations.

The `FT_Size_Metrics` structure is valid for bitmap fonts also.

**TrueType fonts with native bytecode hinting**

All applications that handle TrueType fonts with native hinting must be aware that TTFs expect different rounding of vertical font dimensions. The application has to cater for this, especially if it wants to rely on a TTF's vertical data (for example, to properly align box characters vertically).

Only the application knows _in advance_ that it is going to use native hinting for TTFs! FreeType, on the other hand, selects the hinting mode not at the time of creating an <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object but much later, namely while calling <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>.

Here is some pseudo code that illustrates a possible solution.
```
  font_format = FT_Get_Font_Format( face );

  if ( !strcmp( font_format, "TrueType" ) &&
       do_native_bytecode_hinting         )
  {
    ascender  = ROUND( FT_MulFix( face->ascender,
                                  size_metrics->y_scale ) );
    descender = ROUND( FT_MulFix( face->descender,
                                  size_metrics->y_scale ) );
  }
  else
  {
    ascender  = size_metrics->ascender;
    descender = size_metrics->descender;
  }

  height      = size_metrics->height;
  max_advance = size_metrics->max_advance;
```

<hr>

## FT_GlyphSlotRec

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_GlyphSlotRec_
  {
    <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>        library;
    <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>           face;
    <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a>      next;
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>           glyph_index; /* new in 2.10; was reserved previously */
    <a href="../ft2-basic_types/index.html#ft_generic">FT_Generic</a>        generic;

    <a href="../ft2-base_interface/index.html#ft_glyph_metrics">FT_Glyph_Metrics</a>  metrics;
    <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>          linearHoriAdvance;
    <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>          linearVertAdvance;
    <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>         advance;

    <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_Glyph_Format</a>   format;

    <a href="../ft2-basic_types/index.html#ft_bitmap">FT_Bitmap</a>         bitmap;
    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>            bitmap_left;
    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>            bitmap_top;

    <a href="../ft2-outline_processing/index.html#ft_outline">FT_Outline</a>        outline;

    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>           num_subglyphs;
    <a href="../ft2-base_interface/index.html#ft_subglyph">FT_SubGlyph</a>       subglyphs;

    <span class="keyword">void</span>*             control_data;
    <span class="keyword">long</span>              control_len;

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>            lsb_delta;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>            rsb_delta;

    <span class="keyword">void</span>*             other;

    <a href="../ft2-base_interface/index.html#ft_slot_internal">FT_Slot_Internal</a>  internal;

  } <b>FT_GlyphSlotRec</b>;
</pre>
</div>


FreeType root glyph slot class structure. A glyph slot is a container where individual glyphs can be loaded, be they in outline or bitmap format.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the FreeType library instance this slot belongs to.</p>
</td></tr>
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the parent face object.</p>
</td></tr>
<tr><td class="val" id="next">next</td><td class="desc">
<p>In some cases (like some font tools), several glyph slots per face object can be a good thing. As this is rare, the glyph slots are listed through a direct, single-linked list using its &lsquo;next&rsquo; field.</p>
</td></tr>
<tr><td class="val" id="glyph_index">glyph_index</td><td class="desc">
<p>The glyph index passed as an argument to <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> while initializeing the glyph slot (since FreeType version 2.10).</p>
</td></tr>
<tr><td class="val" id="generic">generic</td><td class="desc">
<p>A typeless pointer unused by the FreeType library or any of its drivers. It can be used by client applications to link their own data to each glyph slot object.</p>
</td></tr>
<tr><td class="val" id="metrics">metrics</td><td class="desc">
<p>The metrics of the last loaded glyph in the slot. The returned values depend on the last load flags (see the <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> API function) and can be expressed either in 26.6 fractional pixels or font units.</p>
<p>Note that even when the glyph image is transformed, the metrics are not.</p>
</td></tr>
<tr><td class="val" id="linearhoriadvance">linearHoriAdvance</td><td class="desc">
<p>The advance width of the unhinted glyph. Its value is expressed in 16.16 fractional pixels, unless <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_LINEAR_DESIGN</a> is set when loading the glyph. This field can be important to perform correct WYSIWYG layout. Only relevant for outline glyphs.</p>
</td></tr>
<tr><td class="val" id="linearvertadvance">linearVertAdvance</td><td class="desc">
<p>The advance height of the unhinted glyph. Its value is expressed in 16.16 fractional pixels, unless <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_LINEAR_DESIGN</a> is set when loading the glyph. This field can be important to perform correct WYSIWYG layout. Only relevant for outline glyphs.</p>
</td></tr>
<tr><td class="val" id="advance">advance</td><td class="desc">
<p>This shorthand is, depending on <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_IGNORE_TRANSFORM</a>, the transformed (hinted) advance width for the glyph, in 26.6 fractional pixel format. As specified with <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_VERTICAL_LAYOUT</a>, it uses either the <code>horiAdvance</code> or the <code>vertAdvance</code> value of &lsquo;metrics&rsquo; field.</p>
</td></tr>
<tr><td class="val" id="format">format</td><td class="desc">
<p>This field indicates the format of the image contained in the glyph slot. Typically <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_BITMAP</a>, <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_OUTLINE</a>, or <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_COMPOSITE</a>, but other values are possible.</p>
</td></tr>
<tr><td class="val" id="bitmap">bitmap</td><td class="desc">
<p>This field is used as a bitmap descriptor. Note that the address and content of the bitmap buffer can change between calls of <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> and a few other functions.</p>
</td></tr>
<tr><td class="val" id="bitmap_left">bitmap_left</td><td class="desc">
<p>The bitmap's left bearing expressed in integer pixels.</p>
</td></tr>
<tr><td class="val" id="bitmap_top">bitmap_top</td><td class="desc">
<p>The bitmap's top bearing expressed in integer pixels. This is the distance from the baseline to the top-most glyph scanline, upwards y&nbsp;coordinates being <strong>positive</strong>.</p>
</td></tr>
<tr><td class="val" id="outline">outline</td><td class="desc">
<p>The outline descriptor for the current glyph image if its format is <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_OUTLINE</a>. Once a glyph is loaded, &lsquo;outline&rsquo; can be transformed, distorted, emboldened, etc. However, it must not be freed.</p>
</td></tr>
<tr><td class="val" id="num_subglyphs">num_subglyphs</td><td class="desc">
<p>The number of subglyphs in a composite glyph. This field is only valid for the composite glyph format that should normally only be loaded with the <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_RECURSE</a> flag.</p>
</td></tr>
<tr><td class="val" id="subglyphs">subglyphs</td><td class="desc">
<p>An array of subglyph descriptors for composite glyphs. There are <code>num_subglyphs</code> elements in there. Currently internal to FreeType.</p>
</td></tr>
<tr><td class="val" id="control_data">control_data</td><td class="desc">
<p>Certain font drivers can also return the control data for a given glyph image (e.g. TrueType bytecode, Type&nbsp;1 charstrings, etc.). This field is a pointer to such data; it is currently internal to FreeType.</p>
</td></tr>
<tr><td class="val" id="control_len">control_len</td><td class="desc">
<p>This is the length in bytes of the control data. Currently internal to FreeType.</p>
</td></tr>
<tr><td class="val" id="other">other</td><td class="desc">
<p>Reserved.</p>
</td></tr>
<tr><td class="val" id="lsb_delta">lsb_delta</td><td class="desc">
<p>The difference between hinted and unhinted left side bearing while auto-hinting is active. Zero otherwise.</p>
</td></tr>
<tr><td class="val" id="rsb_delta">rsb_delta</td><td class="desc">
<p>The difference between hinted and unhinted right side bearing while auto-hinting is active. Zero otherwise.</p>
</td></tr>
</table>

<h4>note</h4>

If <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> is called with default flags (see <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_DEFAULT</a>) the glyph image is loaded in the glyph slot in its native format (e.g., an outline glyph for TrueType and Type&nbsp;1 formats). [Since 2.9] The prospective bitmap metrics are calculated according to <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_XXX</a> and other flags even for the outline glyph, even if <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_RENDER</a> is not set.

This image can later be converted into a bitmap by calling <a href="../ft2-base_interface/index.html#ft_render_glyph">FT_Render_Glyph</a>. This function searches the current renderer for the native image's format, then invokes it.

The renderer is in charge of transforming the native image through the slot's face transformation fields, then converting it into a bitmap that is returned in `slot->bitmap`.

Note that `slot->bitmap_left` and `slot->bitmap_top` are also used to specify the position of the bitmap relative to the current pen position (e.g., coordinates (0,0) on the baseline). Of course, `slot->format` is also changed to <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_BITMAP</a>.

Here is a small pseudo code fragment that shows how to use `lsb_delta` and `rsb_delta` to do fractional positioning of glyphs:
```
  FT_GlyphSlot  slot     = face->glyph;
  FT_Pos        origin_x = 0;


  for all glyphs do
    <load glyph with `FT_Load_Glyph'>

    FT_Outline_Translate( slot->outline, origin_x & 63, 0 );

    <save glyph image, or render glyph, or ...>

    <compute kern between current and next glyph
     and add it to `origin_x'>

    origin_x += slot->advance.x;
    origin_x += slot->rsb_delta - slot->lsb_delta;
  endfor
```

Here is another small pseudo code fragment that shows how to use `lsb_delta` and `rsb_delta` to improve integer positioning of glyphs:
```
  FT_GlyphSlot  slot           = face->glyph;
  FT_Pos        origin_x       = 0;
  FT_Pos        prev_rsb_delta = 0;


  for all glyphs do
    <compute kern between current and previous glyph
     and add it to `origin_x'>

    <load glyph with `FT_Load_Glyph'>

    if ( prev_rsb_delta - slot->lsb_delta >  32 )
      origin_x -= 64;
    else if ( prev_rsb_delta - slot->lsb_delta < -31 )
      origin_x += 64;

    prev_rsb_delta = slot->rsb_delta;

    <save glyph image, or render glyph, or ...>

    origin_x += slot->advance.x;
  endfor
```

If you use strong auto-hinting, you **must** apply these delta values! Otherwise you will experience far too large inter-glyph spacing at small rendering sizes in most cases. Note that it doesn't harm to use the above code for other hinting modes also, since the delta values are zero then.

<hr>

## FT_Glyph_Metrics

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Glyph_Metrics_
  {
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  width;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  height;

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  horiBearingX;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  horiBearingY;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  horiAdvance;

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  vertBearingX;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  vertBearingY;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>  vertAdvance;

  } <b>FT_Glyph_Metrics</b>;
</pre>
</div>


A structure to model the metrics of a single glyph. The values are expressed in 26.6 fractional pixel format; if the flag <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a> has been used while loading the glyph, values are expressed in font units instead.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="width">width</td><td class="desc">
<p>The glyph's width.</p>
</td></tr>
<tr><td class="val" id="height">height</td><td class="desc">
<p>The glyph's height.</p>
</td></tr>
<tr><td class="val" id="horibearingx">horiBearingX</td><td class="desc">
<p>Left side bearing for horizontal layout.</p>
</td></tr>
<tr><td class="val" id="horibearingy">horiBearingY</td><td class="desc">
<p>Top side bearing for horizontal layout.</p>
</td></tr>
<tr><td class="val" id="horiadvance">horiAdvance</td><td class="desc">
<p>Advance width for horizontal layout.</p>
</td></tr>
<tr><td class="val" id="vertbearingx">vertBearingX</td><td class="desc">
<p>Left side bearing for vertical layout.</p>
</td></tr>
<tr><td class="val" id="vertbearingy">vertBearingY</td><td class="desc">
<p>Top side bearing for vertical layout. Larger positive values mean further below the vertical glyph origin.</p>
</td></tr>
<tr><td class="val" id="vertadvance">vertAdvance</td><td class="desc">
<p>Advance height for vertical layout. Positive values mean the glyph has a positive advance downward.</p>
</td></tr>
</table>

<h4>note</h4>

If not disabled with <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_HINTING</a>, the values represent dimensions of the hinted glyph (in case hinting is applicable).

Stroking a glyph with an outside border does not increase `horiAdvance` or `vertAdvance`; you have to manually adjust these values to account for the added width and height.

FreeType doesn't use the &lsquo;VORG&rsquo; table data for CFF fonts because it doesn't have an interface to quickly retrieve the glyph height. The y&nbsp;coordinate of the vertical origin can be simply computed as `vertBearingY + height` after loading a glyph.

<hr>

## FT_SubGlyph

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_SubGlyphRec_*  <b>FT_SubGlyph</b>;
</pre>
</div>


The subglyph structure is an internal object used to describe subglyphs (for example, in the case of composites).

<h4>note</h4>

The subglyph implementation is not part of the high-level API, hence the forward structure declaration.

You can however retrieve subglyph information with <a href="../ft2-base_interface/index.html#ft_get_subglyph_info">FT_Get_SubGlyph_Info</a>.

<hr>

## FT_Bitmap_Size

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Bitmap_Size_
  {
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>  height;
    <a href="../ft2-basic_types/index.html#ft_short">FT_Short</a>  width;

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>    size;

    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>    x_ppem;
    <a href="../ft2-basic_types/index.html#ft_pos">FT_Pos</a>    y_ppem;

  } <b>FT_Bitmap_Size</b>;
</pre>
</div>


This structure models the metrics of a bitmap strike (i.e., a set of glyphs for a given point size and resolution) in a bitmap font. It is used for the `available_sizes` field of <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="height">height</td><td class="desc">
<p>The vertical distance, in pixels, between two consecutive baselines. It is always positive.</p>
</td></tr>
<tr><td class="val" id="width">width</td><td class="desc">
<p>The average width, in pixels, of all glyphs in the strike.</p>
</td></tr>
<tr><td class="val" id="size">size</td><td class="desc">
<p>The nominal size of the strike in 26.6 fractional points. This field is not very useful.</p>
</td></tr>
<tr><td class="val" id="x_ppem">x_ppem</td><td class="desc">
<p>The horizontal ppem (nominal width) in 26.6 fractional pixels.</p>
</td></tr>
<tr><td class="val" id="y_ppem">y_ppem</td><td class="desc">
<p>The vertical ppem (nominal height) in 26.6 fractional pixels.</p>
</td></tr>
</table>

<h4>note</h4>

Windows FNT: The nominal size given in a FNT font is not reliable. If the driver finds it incorrect, it sets &lsquo;size&rsquo; to some calculated values, and `x_ppem` and `y_ppem` to the pixel width and height given in the font, respectively.

TrueType embedded bitmaps: &lsquo;size&rsquo;, &lsquo;width&rsquo;, and &lsquo;height&rsquo; values are not contained in the bitmap strike itself. They are computed from the global font parameters.

<hr>

## FT_Init_FreeType

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Init_FreeType</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>  *alibrary );
</pre>
</div>


Initialize a new FreeType library object. The set of modules that are registered by this function is determined at build time.

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="alibrary">alibrary</td><td class="desc">
<p>A handle to a new library object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

In case you want to provide your own memory allocating routines, use <a href="../ft2-module_management/index.html#ft_new_library">FT_New_Library</a> instead, followed by a call to <a href="../ft2-module_management/index.html#ft_add_default_modules">FT_Add_Default_Modules</a> (or a series of calls to <a href="../ft2-module_management/index.html#ft_add_module">FT_Add_Module</a>) and <a href="../ft2-module_management/index.html#ft_set_default_properties">FT_Set_Default_Properties</a>.

See the documentation of <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a> and <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> for multi-threading issues.

If you need reference-counting (cf. <a href="../ft2-module_management/index.html#ft_reference_library">FT_Reference_Library</a>), use <a href="../ft2-module_management/index.html#ft_new_library">FT_New_Library</a> and <a href="../ft2-module_management/index.html#ft_done_library">FT_Done_Library</a>.

If compilation option FT_CONFIG_OPTION_ENVIRONMENT_PROPERTIES is set, this function reads the `FREETYPE_PROPERTIES` environment variable to control driver properties. See section &lsquo;<a href="../ft2-properties/index.html#properties">Driver properties</a>&rsquo; for more.

<hr>

## FT_Done_FreeType

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Done_FreeType</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>  library );
</pre>
</div>


Destroy a given FreeType library object and all of its children, including resources, drivers, faces, sizes, etc.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the target library object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<hr>

## FT_New_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_New_Face</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>   library,
               <span class="keyword">const</span> <span class="keyword">char</span>*  filepathname,
               <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>      face_index,
               <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     *aface );
</pre>
</div>


Call <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> to open a font by its pathname.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the library resource.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="pathname">pathname</td><td class="desc">
<p>A path to the font file.</p>
</td></tr>
<tr><td class="val" id="face_index">face_index</td><td class="desc">
<p>See <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> for a detailed description of this parameter.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="aface">aface</td><td class="desc">
<p>A handle to a new face object. If <code>face_index</code> is greater than or equal to zero, it must be non-NULL.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Use <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a> to destroy the created <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> object (along with its slot and sizes).

<hr>

## FT_Done_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Done_Face</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face );
</pre>
</div>


Discard a given face object, as well as all of its child slots and sizes.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

See the discussion of reference counters in the description of <a href="../ft2-base_interface/index.html#ft_reference_face">FT_Reference_Face</a>.

<hr>

## FT_Reference_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Reference_Face</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face );
</pre>
</div>


A counter gets initialized to&nbsp;1 at the time an <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> structure is created. This function increments the counter. <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a> then only destroys a face if the counter is&nbsp;1, otherwise it simply decrements the counter.

This function helps in managing life-cycles of structures that reference <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> objects.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>since</h4>

2.4.2

<hr>

## FT_New_Memory_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_New_Memory_Face</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>      library,
                      <span class="keyword">const</span> <a href="../ft2-basic_types/index.html#ft_byte">FT_Byte</a>*  file_base,
                      <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>         file_size,
                      <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>         face_index,
                      <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>        *aface );
</pre>
</div>


Call <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> to open a font that has been loaded into memory.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the library resource.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="file_base">file_base</td><td class="desc">
<p>A pointer to the beginning of the font data.</p>
</td></tr>
<tr><td class="val" id="file_size">file_size</td><td class="desc">
<p>The size of the memory chunk used by the font data.</p>
</td></tr>
<tr><td class="val" id="face_index">face_index</td><td class="desc">
<p>See <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> for a detailed description of this parameter.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="aface">aface</td><td class="desc">
<p>A handle to a new face object. If <code>face_index</code> is greater than or equal to zero, it must be non-NULL.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

You must not deallocate the memory before calling <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a>.

<hr>

## FT_Face_Properties

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Face_Properties</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>        face,
                      <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>        num_properties,
                      <a href="../ft2-base_interface/index.html#ft_parameter">FT_Parameter</a>*  properties );
</pre>
</div>


Set or override certain (library or module-wide) properties on a face-by-face basis. Useful for finer-grained control and avoiding locks on shared structures (threads can modify their own faces as they see fit).

Contrary to <a href="../ft2-module_management/index.html#ft_property_set">FT_Property_Set</a>, this function uses <a href="../ft2-base_interface/index.html#ft_parameter">FT_Parameter</a> so that you can pass multiple properties to the target face in one call. Note that only a subset of the available properties can be controlled.

* <a href="../ft2-parameter_tags/index.html#ft_param_tag_stem_darkening">FT_PARAM_TAG_STEM_DARKENING</a> (stem darkening, corresponding to the property &lsquo;no-stem-darkening&rsquo; provided by the &lsquo;autofit&rsquo;, &lsquo;cff&rsquo;, &lsquo;type1&rsquo;, and &lsquo;t1cid&rsquo; modules; see <a href="../ft2-properties/index.html#no-stem-darkening">no-stem-darkening</a>).

* <a href="../ft2-parameter_tags/index.html#ft_param_tag_lcd_filter_weights">FT_PARAM_TAG_LCD_FILTER_WEIGHTS</a> (LCD filter weights, corresponding to function <a href="../ft2-lcd_rendering/index.html#ft_library_setlcdfilterweights">FT_Library_SetLcdFilterWeights</a>).

* <a href="../ft2-parameter_tags/index.html#ft_param_tag_random_seed">FT_PARAM_TAG_RANDOM_SEED</a> (seed value for the CFF, Type&nbsp;1, and CID &lsquo;random&rsquo; operator, corresponding to the &lsquo;random-seed&rsquo; property provided by the &lsquo;cff&rsquo;, &lsquo;type1&rsquo;, and &lsquo;t1cid&rsquo; modules; see <a href="../ft2-properties/index.html#random-seed">random-seed</a>).

Pass NULL as &lsquo;data&rsquo; in <a href="../ft2-base_interface/index.html#ft_parameter">FT_Parameter</a> for a given tag to reset the option and use the library or module default again.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
<tr><td class="val" id="num_properties">num_properties</td><td class="desc">
<p>The number of properties that follow.</p>
</td></tr>
<tr><td class="val" id="properties">properties</td><td class="desc">
<p>A handle to an <a href="../ft2-base_interface/index.html#ft_parameter">FT_Parameter</a> array with <code>num_properties</code> elements.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>example</h4>

Here an example that sets three properties. You must define FT_CONFIG_OPTION_SUBPIXEL_RENDERING to make the LCD filter examples work.
```
  FT_Parameter         property1;
  FT_Bool              darken_stems = 1;

  FT_Parameter         property2;
  FT_LcdFiveTapFilter  custom_weight =
                         { 0x11, 0x44, 0x56, 0x44, 0x11 };

  FT_Parameter         property3;
  FT_Int32             random_seed = 314159265;

  FT_Parameter         properties[3] = { property1,
                                         property2,
                                         property3 };


  property1.tag  = FT_PARAM_TAG_STEM_DARKENING;
  property1.data = &darken_stems;

  property2.tag  = FT_PARAM_TAG_LCD_FILTER_WEIGHTS;
  property2.data = custom_weight;

  property3.tag  = FT_PARAM_TAG_RANDOM_SEED;
  property3.data = &random_seed;

  FT_Face_Properties( face, 3, properties );
```

The next example resets a single property to its default value.
```
  FT_Parameter  property;


  property.tag  = FT_PARAM_TAG_LCD_FILTER_WEIGHTS;
  property.data = NULL;

  FT_Face_Properties( face, 1, &property );
```

<h4>since</h4>

2.8

<hr>

## FT_Open_Face

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Open_Face</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>           library,
                <span class="keyword">const</span> <a href="../ft2-base_interface/index.html#ft_open_args">FT_Open_Args</a>*  args,
                <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>              face_index,
                <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>             *aface );
</pre>
</div>


Create a face object from a given resource described by <a href="../ft2-base_interface/index.html#ft_open_args">FT_Open_Args</a>.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the library resource.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="args">args</td><td class="desc">
<p>A pointer to an <code>FT_Open_Args</code> structure that must be filled by the caller.</p>
</td></tr>
<tr><td class="val" id="face_index">face_index</td><td class="desc">
<p>This field holds two different values. Bits 0-15 are the index of the face in the font file (starting with value&nbsp;0). Set it to&nbsp;0 if there is only one face in the font file.</p>
<p>[Since 2.6.1] Bits 16-30 are relevant to GX and OpenType variation fonts only, specifying the named instance index for the current face index (starting with value&nbsp;1; value&nbsp;0 makes FreeType ignore named instances). For non-variation fonts, bits 16-30 are ignored. Assuming that you want to access the third named instance in face&nbsp;4, <code>face_index</code> should be set to 0x00030004. If you want to access face&nbsp;4 without variation handling, simply set <code>face_index</code> to value&nbsp;4.</p>
<p><code>FT_Open_Face</code> and its siblings can be used to quickly check whether the font format of a given font resource is supported by FreeType. In general, if the <code>face_index</code> argument is negative, the function's return value is&nbsp;0 if the font format is recognized, or non-zero otherwise. The function allocates a more or less empty face handle in &lsquo;*aface&rsquo; (if &lsquo;aface&rsquo; isn't NULL); the only two useful fields in this special case are <code>face-&gt;num_faces</code> and <code>face-&gt;style_flags</code>. For any negative value of <code>face_index</code>, <code>face-&gt;num_faces</code> gives the number of faces within the font file. For the negative value &lsquo;-(N+1)&rsquo; (with &lsquo;N&rsquo; a non-negative 16-bit value), bits 16-30 in <code>face-&gt;style_flags</code> give the number of named instances in face &lsquo;N&rsquo; if we have a variation font (or zero otherwise). After examination, the returned <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> structure should be deallocated with a call to <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a>.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="aface">aface</td><td class="desc">
<p>A handle to a new face object. If <code>face_index</code> is greater than or equal to zero, it must be non-NULL.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Unlike FreeType 1.x, this function automatically creates a glyph slot for the face object that can be accessed directly through `face->glyph`.

Each new face object created with this function also owns a default <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object, accessible as `face->size`.

One <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a> instance can have multiple face objects, this is, <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> and its siblings can be called multiple times using the same &lsquo;library&rsquo; argument.

See the discussion of reference counters in the description of <a href="../ft2-base_interface/index.html#ft_reference_face">FT_Reference_Face</a>.

<h4>example</h4>

To loop over all faces, use code similar to the following snippet (omitting the error handling).
```
  ...
  FT_Face  face;
  FT_Long  i, num_faces;


  error = FT_Open_Face( library, args, -1, &face );
  if ( error ) { ... }

  num_faces = face->num_faces;
  FT_Done_Face( face );

  for ( i = 0; i < num_faces; i++ )
  {
    ...
    error = FT_Open_Face( library, args, i, &face );
    ...
    FT_Done_Face( face );
    ...
  }
```

To loop over all valid values for `face_index`, use something similar to the following snippet, again without error handling. The code accesses all faces immediately (thus only a single call of `FT_Open_Face` within the do-loop), with and without named instances.
```
  ...
  FT_Face  face;

  FT_Long  num_faces     = 0;
  FT_Long  num_instances = 0;

  FT_Long  face_idx     = 0;
  FT_Long  instance_idx = 0;


  do
  {
    FT_Long  id = ( instance_idx << 16 ) + face_idx;


    error = FT_Open_Face( library, args, id, &face );
    if ( error ) { ... }

    num_faces     = face->num_faces;
    num_instances = face->style_flags >> 16;

    ...

    FT_Done_Face( face );

    if ( instance_idx < num_instances )
      instance_idx++;
    else
    {
      face_idx++;
      instance_idx = 0;
    }

  } while ( face_idx < num_faces )
```

<hr>

## FT_Open_Args

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Open_Args_
  {
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>         flags;
    <span class="keyword">const</span> <a href="../ft2-basic_types/index.html#ft_byte">FT_Byte</a>*  memory_base;
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>         memory_size;
    <a href="../ft2-basic_types/index.html#ft_string">FT_String</a>*      pathname;
    <a href="../ft2-system_interface/index.html#ft_stream">FT_Stream</a>       stream;
    <a href="../ft2-module_management/index.html#ft_module">FT_Module</a>       driver;
    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>          num_params;
    <a href="../ft2-base_interface/index.html#ft_parameter">FT_Parameter</a>*   params;

  } <b>FT_Open_Args</b>;
</pre>
</div>


A structure to indicate how to open a new font file or stream. A pointer to such a structure can be used as a parameter for the functions <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> and <a href="../ft2-base_interface/index.html#ft_attach_stream">FT_Attach_Stream</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="flags">flags</td><td class="desc">
<p>A set of bit flags indicating how to use the structure.</p>
</td></tr>
<tr><td class="val" id="memory_base">memory_base</td><td class="desc">
<p>The first byte of the file in memory.</p>
</td></tr>
<tr><td class="val" id="memory_size">memory_size</td><td class="desc">
<p>The size in bytes of the file in memory.</p>
</td></tr>
<tr><td class="val" id="pathname">pathname</td><td class="desc">
<p>A pointer to an 8-bit file pathname.</p>
</td></tr>
<tr><td class="val" id="stream">stream</td><td class="desc">
<p>A handle to a source stream object.</p>
</td></tr>
<tr><td class="val" id="driver">driver</td><td class="desc">
<p>This field is exclusively used by <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a>; it simply specifies the font driver to use for opening the face. If set to NULL, FreeType tries to load the face with each one of the drivers in its list.</p>
</td></tr>
<tr><td class="val" id="num_params">num_params</td><td class="desc">
<p>The number of extra parameters.</p>
</td></tr>
<tr><td class="val" id="params">params</td><td class="desc">
<p>Extra parameters passed to the font driver when opening a new face.</p>
</td></tr>
</table>

<h4>note</h4>

The stream type is determined by the contents of &lsquo;flags&rsquo; that are tested in the following order by <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a>:

If the <a href="../ft2-base_interface/index.html#ft_open_xxx">FT_OPEN_MEMORY</a> bit is set, assume that this is a memory file of `memory_size` bytes, located at `memory_address`. The data are not copied, and the client is responsible for releasing and destroying them _after_ the corresponding call to <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a>.

Otherwise, if the <a href="../ft2-base_interface/index.html#ft_open_xxx">FT_OPEN_STREAM</a> bit is set, assume that a custom input stream &lsquo;stream&rsquo; is used.

Otherwise, if the <a href="../ft2-base_interface/index.html#ft_open_xxx">FT_OPEN_PATHNAME</a> bit is set, assume that this is a normal file and use &lsquo;pathname&rsquo; to open it.

If the <a href="../ft2-base_interface/index.html#ft_open_xxx">FT_OPEN_DRIVER</a> bit is set, <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> only tries to open the file with the driver whose handler is in &lsquo;driver&rsquo;.

If the <a href="../ft2-base_interface/index.html#ft_open_xxx">FT_OPEN_PARAMS</a> bit is set, the parameters given by `num_params` and &lsquo;params&rsquo; is used. They are ignored otherwise.

Ideally, both the &lsquo;pathname&rsquo; and &lsquo;params&rsquo; fields should be tagged as &lsquo;const&rsquo;; this is missing for API backward compatibility. In other words, applications should treat them as read-only.

<hr>

## FT_Parameter

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Parameter_
  {
    <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a>    tag;
    <a href="../ft2-basic_types/index.html#ft_pointer">FT_Pointer</a>  data;

  } <b>FT_Parameter</b>;
</pre>
</div>


A simple structure to pass more or less generic parameters to <a href="../ft2-base_interface/index.html#ft_open_face">FT_Open_Face</a> and <a href="../ft2-base_interface/index.html#ft_face_properties">FT_Face_Properties</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="tag">tag</td><td class="desc">
<p>A four-byte identification tag.</p>
</td></tr>
<tr><td class="val" id="data">data</td><td class="desc">
<p>A pointer to the parameter data.</p>
</td></tr>
</table>

<h4>note</h4>

The ID and function of parameters are driver-specific. See section &lsquo;<a href="../ft2-parameter_tags/index.html#parameter_tags">Parameter Tags</a>&rsquo; for more information.

<hr>

## FT_Attach_File

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Attach_File</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>      face,
                  <span class="keyword">const</span> <span class="keyword">char</span>*  filepathname );
</pre>
</div>


Call <a href="../ft2-base_interface/index.html#ft_attach_stream">FT_Attach_Stream</a> to attach a file.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>The target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="filepathname">filepathname</td><td class="desc">
<p>The pathname.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<hr>

## FT_Attach_Stream

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Attach_Stream</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>        face,
                    <a href="../ft2-base_interface/index.html#ft_open_args">FT_Open_Args</a>*  parameters );
</pre>
</div>


&lsquo;Attach&rsquo; data to a face object. Normally, this is used to read additional information for the face object. For example, you can attach an AFM file that comes with a Type&nbsp;1 font to get the kerning values and other metrics.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>The target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="parameters">parameters</td><td class="desc">
<p>A pointer to <a href="../ft2-base_interface/index.html#ft_open_args">FT_Open_Args</a> that must be filled by the caller.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

The meaning of the &lsquo;attach&rsquo; (i.e., what really happens when the new file is read) is not fixed by FreeType itself. It really depends on the font format (and thus the font driver).

Client applications are expected to know what they are doing when invoking this function. Most drivers simply do not implement file or stream attachments.

<hr>

## FT_Set_Char_Size

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Set_Char_Size</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                    <a href="../ft2-basic_types/index.html#ft_f26dot6">FT_F26Dot6</a>  char_width,
                    <a href="../ft2-basic_types/index.html#ft_f26dot6">FT_F26Dot6</a>  char_height,
                    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     horz_resolution,
                    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     vert_resolution );
</pre>
</div>


Call <a href="../ft2-base_interface/index.html#ft_request_size">FT_Request_Size</a> to request the nominal size (in points).

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="char_width">char_width</td><td class="desc">
<p>The nominal width, in 26.6 fractional points.</p>
</td></tr>
<tr><td class="val" id="char_height">char_height</td><td class="desc">
<p>The nominal height, in 26.6 fractional points.</p>
</td></tr>
<tr><td class="val" id="horz_resolution">horz_resolution</td><td class="desc">
<p>The horizontal resolution in dpi.</p>
</td></tr>
<tr><td class="val" id="vert_resolution">vert_resolution</td><td class="desc">
<p>The vertical resolution in dpi.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

While this function allows fractional points as input values, the resulting ppem value for the given resolution is always rounded to the nearest integer.

If either the character width or height is zero, it is set equal to the other value.

If either the horizontal or vertical resolution is zero, it is set equal to the other value.

A character width or height smaller than 1pt is set to 1pt; if both resolution values are zero, they are set to 72dpi.

Don't use this function if you are using the FreeType cache API.

<hr>

## FT_Set_Pixel_Sizes

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Set_Pixel_Sizes</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face,
                      <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>  pixel_width,
                      <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>  pixel_height );
</pre>
</div>


Call <a href="../ft2-base_interface/index.html#ft_request_size">FT_Request_Size</a> to request the nominal size (in pixels).

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="pixel_width">pixel_width</td><td class="desc">
<p>The nominal width, in pixels.</p>
</td></tr>
<tr><td class="val" id="pixel_height">pixel_height</td><td class="desc">
<p>The nominal height, in pixels.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

You should not rely on the resulting glyphs matching or being constrained to this pixel size. Refer to <a href="../ft2-base_interface/index.html#ft_request_size">FT_Request_Size</a> to understand how requested sizes relate to actual sizes.

Don't use this function if you are using the FreeType cache API.

<hr>

## FT_Request_Size

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Request_Size</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>          face,
                   <a href="../ft2-base_interface/index.html#ft_size_request">FT_Size_Request</a>  req );
</pre>
</div>


Resize the scale of the active <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object in a face.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="req">req</td><td class="desc">
<p>A pointer to a <a href="../ft2-base_interface/index.html#ft_size_requestrec">FT_Size_RequestRec</a>.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Although drivers may select the bitmap strike matching the request, you should not rely on this if you intend to select a particular bitmap strike. Use <a href="../ft2-base_interface/index.html#ft_select_size">FT_Select_Size</a> instead in that case.

The relation between the requested size and the resulting glyph size is dependent entirely on how the size is defined in the source face. The font designer chooses the final size of each glyph relative to this size. For more information refer to &lsquo;<https://www.freetype.org/freetype2/docs/glyphs/glyphs-2.html>&rsquo;.

Contrary to <a href="../ft2-base_interface/index.html#ft_set_char_size">FT_Set_Char_Size</a>, this function doesn't have special code to normalize zero-valued widths, heights, or resolutions (which lead to errors in most cases).

Don't use this function if you are using the FreeType cache API.

<hr>

## FT_Select_Size

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Select_Size</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face,
                  <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>   strike_index );
</pre>
</div>


Select a bitmap strike. To be more precise, this function sets the scaling factors of the active <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object in a face so that bitmaps from this particular strike are taken by <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> and friends.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="strike_index">strike_index</td><td class="desc">
<p>The index of the bitmap strike in the <code>available_sizes</code> field of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> structure.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

For bitmaps embedded in outline fonts it is common that only a subset of the available glyphs at a given ppem value is available. FreeType silently uses outlines if there is no bitmap for a given glyph index.

For GX and OpenType variation fonts, a bitmap strike makes sense only if the default instance is active (this is, no glyph variation takes place); otherwise, FreeType simply ignores bitmap strikes. The same is true for all named instances that are different from the default instance.

Don't use this function if you are using the FreeType cache API.

<hr>

## FT_Size_Request_Type

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">enum</span>  FT_Size_Request_Type_
  {
    <a href="../ft2-base_interface/index.html#ft_size_request_type_nominal">FT_SIZE_REQUEST_TYPE_NOMINAL</a>,
    <a href="../ft2-base_interface/index.html#ft_size_request_type_real_dim">FT_SIZE_REQUEST_TYPE_REAL_DIM</a>,
    <a href="../ft2-base_interface/index.html#ft_size_request_type_bbox">FT_SIZE_REQUEST_TYPE_BBOX</a>,
    <a href="../ft2-base_interface/index.html#ft_size_request_type_cell">FT_SIZE_REQUEST_TYPE_CELL</a>,
    <a href="../ft2-base_interface/index.html#ft_size_request_type_scales">FT_SIZE_REQUEST_TYPE_SCALES</a>,

    FT_SIZE_REQUEST_TYPE_MAX

  } <b>FT_Size_Request_Type</b>;
</pre>
</div>


An enumeration type that lists the supported size request types, i.e., what input size (in font units) maps to the requested output size (in pixels, as computed from the arguments of <a href="../ft2-base_interface/index.html#ft_size_request">FT_Size_Request</a>).

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_size_request_type_nominal">FT_SIZE_REQUEST_TYPE_NOMINAL</td><td class="desc">
<p>The nominal size. The <code>units_per_EM</code> field of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> is used to determine both scaling values.</p>
<p>This is the standard scaling found in most applications. In particular, use this size request type for TrueType fonts if they provide optical scaling or something similar. Note, however, that <code>units_per_EM</code> is a rather abstract value which bears no relation to the actual size of the glyphs in a font.</p>
</td></tr>
<tr><td class="val" id="ft_size_request_type_real_dim">FT_SIZE_REQUEST_TYPE_REAL_DIM</td><td class="desc">
<p>The real dimension. The sum of the &lsquo;ascender&rsquo; and (minus of) the &lsquo;descender&rsquo; fields of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> is used to determine both scaling values.</p>
</td></tr>
<tr><td class="val" id="ft_size_request_type_bbox">FT_SIZE_REQUEST_TYPE_BBOX</td><td class="desc">
<p>The font bounding box. The width and height of the &lsquo;bbox&rsquo; field of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> are used to determine the horizontal and vertical scaling value, respectively.</p>
</td></tr>
<tr><td class="val" id="ft_size_request_type_cell">FT_SIZE_REQUEST_TYPE_CELL</td><td class="desc">
<p>The <code>max_advance_width</code> field of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> is used to determine the horizontal scaling value; the vertical scaling value is determined the same way as <a href="../ft2-base_interface/index.html#ft_size_request_type">FT_SIZE_REQUEST_TYPE_REAL_DIM</a> does. Finally, both scaling values are set to the smaller one. This type is useful if you want to specify the font size for, say, a window of a given dimension and 80x24 cells.</p>
</td></tr>
<tr><td class="val" id="ft_size_request_type_scales">FT_SIZE_REQUEST_TYPE_SCALES</td><td class="desc">
<p>Specify the scaling values directly.</p>
</td></tr>
</table>

<h4>note</h4>

The above descriptions only apply to scalable formats. For bitmap formats, the behaviour is up to the driver.

See the note section of <a href="../ft2-base_interface/index.html#ft_size_metrics">FT_Size_Metrics</a> if you wonder how size requesting relates to scaling values.

<hr>

## FT_Size_RequestRec

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_Size_RequestRec_
  {
    <a href="../ft2-base_interface/index.html#ft_size_request_type">FT_Size_Request_Type</a>  type;
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>               width;
    <a href="../ft2-basic_types/index.html#ft_long">FT_Long</a>               height;
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>               horiResolution;
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>               vertResolution;

  } <b>FT_Size_RequestRec</b>;
</pre>
</div>


A structure to model a size request.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="type">type</td><td class="desc">
<p>See <a href="../ft2-base_interface/index.html#ft_size_request_type">FT_Size_Request_Type</a>.</p>
</td></tr>
<tr><td class="val" id="width">width</td><td class="desc">
<p>The desired width, given as a 26.6 fractional point value (with 72pt = 1in).</p>
</td></tr>
<tr><td class="val" id="height">height</td><td class="desc">
<p>The desired height, given as a 26.6 fractional point value (with 72pt = 1in).</p>
</td></tr>
<tr><td class="val" id="horiresolution">horiResolution</td><td class="desc">
<p>The horizontal resolution (dpi, i.e., pixels per inch). If set to zero, &lsquo;width&rsquo; is treated as a 26.6 fractional <strong>pixel</strong> value, which gets internally rounded to an integer.</p>
</td></tr>
<tr><td class="val" id="vertresolution">vertResolution</td><td class="desc">
<p>The vertical resolution (dpi, i.e., pixels per inch). If set to zero, &lsquo;height&rsquo; is treated as a 26.6 fractional <strong>pixel</strong> value, which gets internally rounded to an integer.</p>
</td></tr>
</table>

<h4>note</h4>

If &lsquo;width&rsquo; is zero, the horizontal scaling value is set equal to the vertical scaling value, and vice versa.

If &lsquo;type&rsquo; is FT_SIZE_REQUEST_TYPE_SCALES, &lsquo;width&rsquo; and &lsquo;height&rsquo; are interpreted directly as 16.16 fractional scaling values, without any further modification, and both `horiResolution` and `vertResolution` are ignored.

<hr>

## FT_Size_Request

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_Size_RequestRec_  *<b>FT_Size_Request</b>;
</pre>
</div>


A handle to a size request structure.

<hr>

## FT_Set_Transform

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <span class="keyword">void</span> )
  <b>FT_Set_Transform</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                    <a href="../ft2-basic_types/index.html#ft_matrix">FT_Matrix</a>*  matrix,
                    <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>*  delta );
</pre>
</div>


Set the transformation that is applied to glyph images when they are loaded into a glyph slot through <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="matrix">matrix</td><td class="desc">
<p>A pointer to the transformation's 2x2 matrix. Use NULL for the identity matrix.</p>
</td></tr>
<tr><td class="val" id="delta">delta</td><td class="desc">
<p>A pointer to the translation vector. Use NULL for the null vector.</p>
</td></tr>
</table>

<h4>note</h4>

The transformation is only applied to scalable image formats after the glyph has been loaded. It means that hinting is unaltered by the transformation and is performed on the character size given in the last call to <a href="../ft2-base_interface/index.html#ft_set_char_size">FT_Set_Char_Size</a> or <a href="../ft2-base_interface/index.html#ft_set_pixel_sizes">FT_Set_Pixel_Sizes</a>.

Note that this also transforms the `face.glyph.advance` field, but **not** the values in `face.glyph.metrics`.

<hr>

## FT_Load_Glyph

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Load_Glyph</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>   face,
                 <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>   glyph_index,
                 <a href="../ft2-basic_types/index.html#ft_int32">FT_Int32</a>  load_flags );
</pre>
</div>


Load a glyph into the glyph slot of a face object.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the target face object where the glyph is loaded.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="glyph_index">glyph_index</td><td class="desc">
<p>The index of the glyph in the font file. For CID-keyed fonts (either in PS or in CFF format) this argument specifies the CID value.</p>
</td></tr>
<tr><td class="val" id="load_flags">load_flags</td><td class="desc">
<p>A flag indicating what to load for this glyph. The <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_XXX</a> constants can be used to control the glyph loading process (e.g., whether the outline should be scaled, whether to load bitmaps or not, whether to hint the outline, etc).</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

The loaded glyph may be transformed. See <a href="../ft2-base_interface/index.html#ft_set_transform">FT_Set_Transform</a> for the details.

For subsetted CID-keyed fonts, `FT_Err_Invalid_Argument` is returned for invalid CID values (this is, for CID values that don't have a corresponding glyph in the font). See the discussion of the <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_CID_KEYED</a> flag for more details.

If you receive `FT_Err_Glyph_Too_Big`, try getting the glyph outline at EM size, then scale it manually and fill it as a graphics operation.

<hr>

## FT_Get_Char_Index

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a> )
  <b>FT_Get_Char_Index</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>   face,
                     <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a>  charcode );
</pre>
</div>


Return the glyph index of a given character code. This function uses the currently selected charmap to do the mapping.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
<tr><td class="val" id="charcode">charcode</td><td class="desc">
<p>The character code.</p>
</td></tr>
</table>

<h4>return</h4>

The glyph index. 0&nbsp;means &lsquo;undefined character code&rsquo;.

<h4>note</h4>

If you use FreeType to manipulate the contents of font files directly, be aware that the glyph index returned by this function doesn't always correspond to the internal indices used within the file. This is done to ensure that value&nbsp;0 always corresponds to the &lsquo;missing glyph&rsquo;. If the first glyph is not named &lsquo;.notdef&rsquo;, then for Type&nbsp;1 and Type&nbsp;42 fonts, &lsquo;.notdef&rsquo; will be moved into the glyph ID&nbsp;0 position, and whatever was there will be moved to the position &lsquo;.notdef&rsquo; had. For Type&nbsp;1 fonts, if there is no &lsquo;.notdef&rsquo; glyph at all, then one will be created at index&nbsp;0 and whatever was there will be moved to the last index -- Type&nbsp;42 fonts are considered invalid under this condition.

<hr>

## FT_Get_First_Char

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a> )
  <b>FT_Get_First_Char</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>   face,
                     <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>  *agindex );
</pre>
</div>


Return the first character code in the current charmap of a given face, together with its corresponding glyph index.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="agindex">agindex</td><td class="desc">
<p>Glyph index of first character code. 0&nbsp;if charmap is empty.</p>
</td></tr>
</table>

<h4>return</h4>

The charmap's first character code.

<h4>note</h4>

You should use this function together with <a href="../ft2-base_interface/index.html#ft_get_next_char">FT_Get_Next_Char</a> to parse all character codes available in a given charmap. The code should look like this:
```
  FT_ULong  charcode;
  FT_UInt   gindex;


  charcode = FT_Get_First_Char( face, &gindex );
  while ( gindex != 0 )
  {
    ... do something with (charcode,gindex) pair ...

    charcode = FT_Get_Next_Char( face, charcode, &gindex );
  }
```

Be aware that character codes can have values up to 0xFFFFFFFF; this might happen for non-Unicode or malformed cmaps. However, even with regular Unicode encoding, so-called &lsquo;last resort fonts&rsquo; (using SFNT cmap format 13, see function <a href="../ft2-truetype_tables/index.html#ft_get_cmap_format">FT_Get_CMap_Format</a>) normally have entries for all Unicode characters up to 0x1FFFFF, which can cause *a lot* of iterations.

Note that &lsquo;*agindex&rsquo; is set to&nbsp;0 if the charmap is empty. The result itself can be&nbsp;0 in two cases: if the charmap is empty or if the value&nbsp;0 is the first valid character code.

<hr>

## FT_Get_Next_Char

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a> )
  <b>FT_Get_Next_Char</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>    face,
                    <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a>   char_code,
                    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>   *agindex );
</pre>
</div>


Return the next character code in the current charmap of a given face following the value `char_code`, as well as the corresponding glyph index.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
<tr><td class="val" id="char_code">char_code</td><td class="desc">
<p>The starting character code.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="agindex">agindex</td><td class="desc">
<p>Glyph index of next character code. 0&nbsp;if charmap is empty.</p>
</td></tr>
</table>

<h4>return</h4>

The charmap's next character code.

<h4>note</h4>

You should use this function with <a href="../ft2-base_interface/index.html#ft_get_first_char">FT_Get_First_Char</a> to walk over all character codes available in a given charmap. See the note for that function for a simple code example.

Note that &lsquo;*agindex&rsquo; is set to&nbsp;0 when there are no more codes in the charmap.

<hr>

## FT_Get_Name_Index

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a> )
  <b>FT_Get_Name_Index</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                     <a href="../ft2-basic_types/index.html#ft_string">FT_String</a>*  glyph_name );
</pre>
</div>


Return the glyph index of a given glyph name.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
<tr><td class="val" id="glyph_name">glyph_name</td><td class="desc">
<p>The glyph name.</p>
</td></tr>
</table>

<h4>return</h4>

The glyph index. 0&nbsp;means &lsquo;undefined character code&rsquo;.

<hr>

## FT_Load_Char

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Load_Char</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>   face,
                <a href="../ft2-basic_types/index.html#ft_ulong">FT_ULong</a>  char_code,
                <a href="../ft2-basic_types/index.html#ft_int32">FT_Int32</a>  load_flags );
</pre>
</div>


Load a glyph into the glyph slot of a face object, accessed by its character code.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a target face object where the glyph is loaded.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="char_code">char_code</td><td class="desc">
<p>The glyph's character code, according to the current charmap used in the face.</p>
</td></tr>
<tr><td class="val" id="load_flags">load_flags</td><td class="desc">
<p>A flag indicating what to load for this glyph. The <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_XXX</a> constants can be used to control the glyph loading process (e.g., whether the outline should be scaled, whether to load bitmaps or not, whether to hint the outline, etc).</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

This function simply calls <a href="../ft2-base_interface/index.html#ft_get_char_index">FT_Get_Char_Index</a> and <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>.

Many fonts contain glyphs that can't be loaded by this function since its glyph indices are not listed in any of the font's charmaps.

If no active cmap is set up (i.e., `face->charmap` is zero), the call to <a href="../ft2-base_interface/index.html#ft_get_char_index">FT_Get_Char_Index</a> is omitted, and the function behaves identically to <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>.

<hr>

## FT_LOAD_TARGET_MODE

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_LOAD_TARGET_MODE</b>( x )  ( (<a href="../ft2-base_interface/index.html#ft_render_mode">FT_Render_Mode</a>)( ( (x) &gt;&gt; 16 ) &amp; 15 ) )
</pre>
</div>


Return the <a href="../ft2-base_interface/index.html#ft_render_mode">FT_Render_Mode</a> corresponding to a given <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_XXX</a> value.

<hr>

## FT_Render_Glyph

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Render_Glyph</b>( <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a>    slot,
                   <a href="../ft2-base_interface/index.html#ft_render_mode">FT_Render_Mode</a>  render_mode );
</pre>
</div>


Convert a given glyph image to a bitmap. It does so by inspecting the glyph image format, finding the relevant renderer, and invoking it.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="slot">slot</td><td class="desc">
<p>A handle to the glyph slot containing the image to convert.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="render_mode">render_mode</td><td class="desc">
<p>The render mode used to render the glyph image into a bitmap. See <a href="../ft2-base_interface/index.html#ft_render_mode">FT_Render_Mode</a> for a list of possible values.</p>
<p>If <a href="../ft2-base_interface/index.html#ft_render_mode">FT_RENDER_MODE_NORMAL</a> is used, the flag <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_COLOR</a> can be additionally set to make the function provide a default blending of colored glyph layers associated with the current glyph slot (provided the font contains such layers) instead of rendering the glyph slot's outline. See <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_COLOR</a> for more information.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

To get meaningful results, font scaling values must be set with functions like <a href="../ft2-base_interface/index.html#ft_set_char_size">FT_Set_Char_Size</a> before calling `FT_Render_Glyph`.

When FreeType outputs a bitmap of a glyph, it really outputs an alpha coverage map. If a pixel is completely covered by a filled-in outline, the bitmap contains 0xFF at that pixel, meaning that 0xFF/0xFF fraction of that pixel is covered, meaning the pixel is 100% black (or 0% bright). If a pixel is only 50% covered (value 0x80), the pixel is made 50% black (50% bright or a middle shade of grey). 0% covered means 0% black (100% bright or white).

On high-DPI screens like on smartphones and tablets, the pixels are so small that their chance of being completely covered and therefore completely black are fairly good. On the low-DPI screens, however, the situation is different. The pixels are too large for most of the details of a glyph and shades of gray are the norm rather than the exception.

This is relevant because all our screens have a second problem: they are not linear. 1&nbsp;+&nbsp;1 is not&nbsp;2. Twice the value does not result in twice the brightness. When a pixel is only 50% covered, the coverage map says 50% black, and this translates to a pixel value of 128 when you use 8&nbsp;bits per channel (0-255). However, this does not translate to 50% brightness for that pixel on our sRGB and gamma&nbsp;2.2 screens. Due to their non-linearity, they dwell longer in the darks and only a pixel value of about 186 results in 50% brightness -- 128 ends up too dark on both bright and dark backgrounds. The net result is that dark text looks burnt-out, pixely and blotchy on bright background, bright text too frail on dark backgrounds, and colored text on colored background (for example, red on green) seems to have dark halos or &lsquo;dirt&rsquo; around it. The situation is especially ugly for diagonal stems like in &lsquo;w&rsquo; glyph shapes where the quality of FreeType's anti-aliasing depends on the correct display of grays. On high-DPI screens where smaller, fully black pixels reign supreme, this doesn't matter, but on our low-DPI screens with all the gray shades, it does. 0% and 100% brightness are the same things in linear and non-linear space, just all the shades in-between aren't.

The blending function for placing text over a background is
```
  dst = alpha * src + (1 - alpha) * dst    ,
```

which is known as the OVER operator.

To correctly composite an antialiased pixel of a glyph onto a surface,

1. take the foreground and background colors (e.g., in sRGB space) and apply gamma to get them in a linear space,

2. use OVER to blend the two linear colors using the glyph pixel as the alpha value (remember, the glyph bitmap is an alpha coverage bitmap), and

3. apply inverse gamma to the blended pixel and write it back to the image.

Internal testing at Adobe found that a target inverse gamma of&nbsp;1.8 for step&nbsp;3 gives good results across a wide range of displays with an sRGB gamma curve or a similar one.

This process can cost performance. There is an approximation that does not need to know about the background color; see <https://bel.fi/alankila/lcd/> and <https://bel.fi/alankila/lcd/alpcor.html> for details.

**ATTENTION**: Linear blending is even more important when dealing with subpixel-rendered glyphs to prevent color-fringing! A subpixel-rendered glyph must first be filtered with a filter that gives equal weight to the three color primaries and does not exceed a sum of 0x100, see section &lsquo;<a href="../ft2-lcd_rendering/index.html#lcd_rendering">Subpixel Rendering</a>&rsquo;. Then the only difference to gray linear blending is that subpixel-rendered linear blending is done 3&nbsp;times per pixel: red foreground subpixel to red background subpixel and so on for green and blue.

<hr>

## FT_Render_Mode

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">enum</span>  FT_Render_Mode_
  {
    <a href="../ft2-base_interface/index.html#ft_render_mode_normal">FT_RENDER_MODE_NORMAL</a> = 0,
    <a href="../ft2-base_interface/index.html#ft_render_mode_light">FT_RENDER_MODE_LIGHT</a>,
    <a href="../ft2-base_interface/index.html#ft_render_mode_mono">FT_RENDER_MODE_MONO</a>,
    <a href="../ft2-base_interface/index.html#ft_render_mode_lcd">FT_RENDER_MODE_LCD</a>,
    <a href="../ft2-base_interface/index.html#ft_render_mode_lcd_v">FT_RENDER_MODE_LCD_V</a>,

    FT_RENDER_MODE_MAX

  } <b>FT_Render_Mode</b>;


  /* these constants are deprecated; use the corresponding */
  /* `<b>FT_Render_Mode</b>' values instead                       */
#<span class="keyword">define</span> ft_render_mode_normal  <a href="../ft2-base_interface/index.html#ft_render_mode_normal">FT_RENDER_MODE_NORMAL</a>
#<span class="keyword">define</span> ft_render_mode_mono    <a href="../ft2-base_interface/index.html#ft_render_mode_mono">FT_RENDER_MODE_MONO</a>
</pre>
</div>


Render modes supported by FreeType&nbsp;2. Each mode corresponds to a specific type of scanline conversion performed on the outline.

For bitmap fonts and embedded bitmaps the `bitmap->pixel_mode` field in the <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a> structure gives the format of the returned bitmap.

All modes except <a href="../ft2-base_interface/index.html#ft_render_mode">FT_RENDER_MODE_MONO</a> use 256 levels of opacity, indicating pixel coverage. Use linear alpha blending and gamma correction to correctly render non-monochrome glyph bitmaps onto a surface; see <a href="../ft2-base_interface/index.html#ft_render_glyph">FT_Render_Glyph</a>.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_render_mode_normal">FT_RENDER_MODE_NORMAL</td><td class="desc">
<p>Default render mode; it corresponds to 8-bit anti-aliased bitmaps.</p>
</td></tr>
<tr><td class="val" id="ft_render_mode_light">FT_RENDER_MODE_LIGHT</td><td class="desc">
<p>This is equivalent to <a href="../ft2-base_interface/index.html#ft_render_mode">FT_RENDER_MODE_NORMAL</a>. It is only defined as a separate value because render modes are also used indirectly to define hinting algorithm selectors. See <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_XXX</a> for details.</p>
</td></tr>
<tr><td class="val" id="ft_render_mode_mono">FT_RENDER_MODE_MONO</td><td class="desc">
<p>This mode corresponds to 1-bit bitmaps (with 2&nbsp;levels of opacity).</p>
</td></tr>
<tr><td class="val" id="ft_render_mode_lcd">FT_RENDER_MODE_LCD</td><td class="desc">
<p>This mode corresponds to horizontal RGB and BGR subpixel displays like LCD screens. It produces 8-bit bitmaps that are 3&nbsp;times the width of the original glyph outline in pixels, and which use the <a href="../ft2-basic_types/index.html#ft_pixel_mode">FT_PIXEL_MODE_LCD</a> mode.</p>
</td></tr>
<tr><td class="val" id="ft_render_mode_lcd_v">FT_RENDER_MODE_LCD_V</td><td class="desc">
<p>This mode corresponds to vertical RGB and BGR subpixel displays (like PDA screens, rotated LCD displays, etc.). It produces 8-bit bitmaps that are 3&nbsp;times the height of the original glyph outline in pixels and use the <a href="../ft2-basic_types/index.html#ft_pixel_mode">FT_PIXEL_MODE_LCD_V</a> mode.</p>
</td></tr>
</table>

<h4>note</h4>

Should you define FT_CONFIG_OPTION_SUBPIXEL_RENDERING in your `ftoption.h`, which enables patented ClearType-style rendering, the LCD-optimized glyph bitmaps should be filtered to reduce color fringes inherent to this technology. You can either set up LCD filtering with <a href="../ft2-lcd_rendering/index.html#ft_library_setlcdfilter">FT_Library_SetLcdFilter</a> or <a href="../ft2-base_interface/index.html#ft_face_properties">FT_Face_Properties</a>, or do the filtering yourself. The default FreeType LCD rendering technology does not require filtering.

The selected render mode only affects vector glyphs of a font. Embedded bitmaps often have a different pixel mode like <a href="../ft2-basic_types/index.html#ft_pixel_mode">FT_PIXEL_MODE_MONO</a>. You can use <a href="../ft2-bitmap_handling/index.html#ft_bitmap_convert">FT_Bitmap_Convert</a> to transform them into 8-bit pixmaps.

<hr>

## FT_Get_Kerning

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Get_Kerning</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                  <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     left_glyph,
                  <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     right_glyph,
                  <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     kern_mode,
                  <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>  *akerning );
</pre>
</div>


Return the kerning vector between two glyphs of the same face.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a source face object.</p>
</td></tr>
<tr><td class="val" id="left_glyph">left_glyph</td><td class="desc">
<p>The index of the left glyph in the kern pair.</p>
</td></tr>
<tr><td class="val" id="right_glyph">right_glyph</td><td class="desc">
<p>The index of the right glyph in the kern pair.</p>
</td></tr>
<tr><td class="val" id="kern_mode">kern_mode</td><td class="desc">
<p>See <a href="../ft2-base_interface/index.html#ft_kerning_mode">FT_Kerning_Mode</a> for more information. Determines the scale and dimension of the returned kerning vector.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="akerning">akerning</td><td class="desc">
<p>The kerning vector. This is either in font units, fractional pixels (26.6 format), or pixels for scalable formats, and in pixels for fixed-sizes formats.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Only horizontal layouts (left-to-right &amp; right-to-left) are supported by this method. Other layouts, or more sophisticated kernings, are out of the scope of this API function -- they can be implemented through format-specific interfaces.

Kerning for OpenType fonts implemented in a &lsquo;GPOS&rsquo; table is not supported; use <a href="../ft2-base_interface/index.html#ft_has_kerning">FT_HAS_KERNING</a> to find out whether a font has data that can be extracted with `FT_Get_Kerning`.

<hr>

## FT_Kerning_Mode

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">enum</span>  FT_Kerning_Mode_
  {
    <a href="../ft2-base_interface/index.html#ft_kerning_default">FT_KERNING_DEFAULT</a> = 0,
    <a href="../ft2-base_interface/index.html#ft_kerning_unfitted">FT_KERNING_UNFITTED</a>,
    <a href="../ft2-base_interface/index.html#ft_kerning_unscaled">FT_KERNING_UNSCALED</a>

  } <b>FT_Kerning_Mode</b>;


  /* these constants are deprecated; use the corresponding */
  /* `<b>FT_Kerning_Mode</b>' values instead                      */
#<span class="keyword">define</span> ft_kerning_default   <a href="../ft2-base_interface/index.html#ft_kerning_default">FT_KERNING_DEFAULT</a>
#<span class="keyword">define</span> ft_kerning_unfitted  <a href="../ft2-base_interface/index.html#ft_kerning_unfitted">FT_KERNING_UNFITTED</a>
#<span class="keyword">define</span> ft_kerning_unscaled  <a href="../ft2-base_interface/index.html#ft_kerning_unscaled">FT_KERNING_UNSCALED</a>
</pre>
</div>


An enumeration to specify the format of kerning values returned by <a href="../ft2-base_interface/index.html#ft_get_kerning">FT_Get_Kerning</a>.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_kerning_default">FT_KERNING_DEFAULT</td><td class="desc">
<p>Return grid-fitted kerning distances in 26.6 fractional pixels.</p>
</td></tr>
<tr><td class="val" id="ft_kerning_unfitted">FT_KERNING_UNFITTED</td><td class="desc">
<p>Return un-grid-fitted kerning distances in 26.6 fractional pixels.</p>
</td></tr>
<tr><td class="val" id="ft_kerning_unscaled">FT_KERNING_UNSCALED</td><td class="desc">
<p>Return the kerning vector in original font units.</p>
</td></tr>
</table>

<h4>note</h4>

FT_KERNING_DEFAULT returns full pixel values; it also makes FreeType heuristically scale down kerning distances at small ppem values so that they don't become too big.

Both FT_KERNING_DEFAULT and FT_KERNING_UNFITTED use the current horizontal scaling factor (as set e.g. with <a href="../ft2-base_interface/index.html#ft_set_char_size">FT_Set_Char_Size</a>) to convert font units to pixels.

<hr>

## FT_Get_Track_Kerning

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Get_Track_Kerning</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>    face,
                        <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>   point_size,
                        <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>     degree,
                        <a href="../ft2-basic_types/index.html#ft_fixed">FT_Fixed</a>*  akerning );
</pre>
</div>


Return the track kerning for a given face object at a given size.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a source face object.</p>
</td></tr>
<tr><td class="val" id="point_size">point_size</td><td class="desc">
<p>The point size in 16.16 fractional points.</p>
</td></tr>
<tr><td class="val" id="degree">degree</td><td class="desc">
<p>The degree of tightness. Increasingly negative values represent tighter track kerning, while increasingly positive values represent looser track kerning. Value zero means no track kerning.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="akerning">akerning</td><td class="desc">
<p>The kerning in 16.16 fractional points, to be uniformly applied between all glyphs.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Currently, only the Type&nbsp;1 font driver supports track kerning, using data from AFM files (if attached with <a href="../ft2-base_interface/index.html#ft_attach_file">FT_Attach_File</a> or <a href="../ft2-base_interface/index.html#ft_attach_stream">FT_Attach_Stream</a>).

Only very few AFM files come with track kerning data; please refer to Adobe's AFM specification for more details.

<hr>

## FT_Get_Glyph_Name

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Get_Glyph_Name</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                     <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     glyph_index,
                     <a href="../ft2-basic_types/index.html#ft_pointer">FT_Pointer</a>  buffer,
                     <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>     buffer_max );
</pre>
</div>


Retrieve the ASCII name of a given glyph in a face. This only works for those faces where <a href="../ft2-base_interface/index.html#ft_has_glyph_names">FT_HAS_GLYPH_NAMES</a>(face) returns&nbsp;1.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to a source face object.</p>
</td></tr>
<tr><td class="val" id="glyph_index">glyph_index</td><td class="desc">
<p>The glyph index.</p>
</td></tr>
<tr><td class="val" id="buffer_max">buffer_max</td><td class="desc">
<p>The maximum number of bytes available in the buffer.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="buffer">buffer</td><td class="desc">
<p>A pointer to a target buffer where the name is copied to.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

An error is returned if the face doesn't provide glyph names or if the glyph index is invalid. In all cases of failure, the first byte of &lsquo;buffer&rsquo; is set to&nbsp;0 to indicate an empty name.

The glyph name is truncated to fit within the buffer if it is too long. The returned string is always zero-terminated.

Be aware that FreeType reorders glyph indices internally so that glyph index&nbsp;0 always corresponds to the &lsquo;missing glyph&rsquo; (called &lsquo;.notdef&rsquo;).

This function always returns an error if the config macro `FT_CONFIG_OPTION_NO_GLYPH_NAMES` is not defined in `ftoption.h`.

<hr>

## FT_Get_Postscript_Name

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <span class="keyword">const</span> <span class="keyword">char</span>* )
  <b>FT_Get_Postscript_Name</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face );
</pre>
</div>


Retrieve the ASCII PostScript name of a given face, if available. This only works with PostScript, TrueType, and OpenType fonts.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>return</h4>

A pointer to the face's PostScript name. NULL if unavailable.

<h4>note</h4>

The returned pointer is owned by the face and is destroyed with it.

For variation fonts, this string changes if you select a different instance, and you have to call `FT_Get_PostScript_Name` again to retrieve it. FreeType follows Adobe TechNote #5902, &lsquo;Generating PostScript Names for Fonts Using OpenType Font Variations&rsquo;.

<https://download.macromedia.com/pub/developer/opentype/tech-notes/5902.AdobePSNameGeneration.html>

[Since 2.9] Special PostScript names for named instances are only returned if the named instance is set with <a href="../ft2-multiple_masters/index.html#ft_set_named_instance">FT_Set_Named_Instance</a> (and the font has corresponding entries in its &lsquo;fvar&rsquo; table). If <a href="../ft2-base_interface/index.html#ft_is_variation">FT_IS_VARIATION</a> returns true, the algorithmically derived PostScript name is provided, not looking up special entries for named instances.

<hr>

## FT_CharMapRec

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_CharMapRec_
  {
    <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>      face;
    <a href="../ft2-base_interface/index.html#ft_encoding">FT_Encoding</a>  encoding;
    <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a>    platform_id;
    <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a>    encoding_id;

  } <b>FT_CharMapRec</b>;
</pre>
</div>


The base charmap structure.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the parent face object.</p>
</td></tr>
<tr><td class="val" id="encoding">encoding</td><td class="desc">
<p>An <a href="../ft2-base_interface/index.html#ft_encoding">FT_Encoding</a> tag identifying the charmap. Use this with <a href="../ft2-base_interface/index.html#ft_select_charmap">FT_Select_Charmap</a>.</p>
</td></tr>
<tr><td class="val" id="platform_id">platform_id</td><td class="desc">
<p>An ID number describing the platform for the following encoding ID. This comes directly from the TrueType specification and gets emulated for other formats.</p>
</td></tr>
<tr><td class="val" id="encoding_id">encoding_id</td><td class="desc">
<p>A platform specific encoding number. This also comes from the TrueType specification and gets emulated similarly.</p>
</td></tr>
</table>

<hr>

## FT_Select_Charmap

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Select_Charmap</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>      face,
                     <a href="../ft2-base_interface/index.html#ft_encoding">FT_Encoding</a>  encoding );
</pre>
</div>


Select a given charmap by its encoding tag (as listed in `freetype.h`).

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="encoding">encoding</td><td class="desc">
<p>A handle to the selected encoding.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

This function returns an error if no charmap in the face corresponds to the encoding queried here.

Because many fonts contain more than a single cmap for Unicode encoding, this function has some special code to select the one that covers Unicode best (&lsquo;best&rsquo; in the sense that a UCS-4 cmap is preferred to a UCS-2 cmap). It is thus preferable to <a href="../ft2-base_interface/index.html#ft_set_charmap">FT_Set_Charmap</a> in this case.

<hr>

## FT_Set_Charmap

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Set_Charmap</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>     face,
                  <a href="../ft2-base_interface/index.html#ft_charmap">FT_CharMap</a>  charmap );
</pre>
</div>


Select a given charmap for character code to glyph index mapping.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="charmap">charmap</td><td class="desc">
<p>A handle to the selected charmap.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

This function returns an error if the charmap is not part of the face (i.e., if it is not listed in the `face->charmaps` table).

It also fails if an OpenType type&nbsp;14 charmap is selected (which doesn't map character codes to glyph indices at all).

<hr>

## FT_Get_Charmap_Index

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a> )
  <b>FT_Get_Charmap_Index</b>( <a href="../ft2-base_interface/index.html#ft_charmap">FT_CharMap</a>  charmap );
</pre>
</div>


Retrieve index of a given charmap.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="charmap">charmap</td><td class="desc">
<p>A handle to a charmap.</p>
</td></tr>
</table>

<h4>return</h4>

The index into the array of character maps within the face to which &lsquo;charmap&rsquo; belongs. If an error occurs, -1 is returned.

<hr>

## FT_Get_FSType_Flags

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_ushort">FT_UShort</a> )
  <b>FT_Get_FSType_Flags</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>  face );
</pre>
</div>


Return the `fsType` flags for a font.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the source face object.</p>
</td></tr>
</table>

<h4>return</h4>

The `fsType` flags, see <a href="../ft2-base_interface/index.html#ft_fstype_xxx">FT_FSTYPE_XXX</a>.

<h4>note</h4>

Use this function rather than directly reading the `fs_type` field in the <a href="../ft2-type1_tables/index.html#ps_fontinforec">PS_FontInfoRec</a> structure, which is only guaranteed to return the correct results for Type&nbsp;1 fonts.

<h4>since</h4>

2.3.8

<hr>

## FT_Get_SubGlyph_Info

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Get_SubGlyph_Info</b>( <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a>  glyph,
                        <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>       sub_index,
                        <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>       *p_index,
                        <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>      *p_flags,
                        <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>       *p_arg1,
                        <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>       *p_arg2,
                        <a href="../ft2-basic_types/index.html#ft_matrix">FT_Matrix</a>    *p_transform );
</pre>
</div>


Retrieve a description of a given subglyph. Only use it if `glyph->format` is <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_COMPOSITE</a>; an error is returned otherwise.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="glyph">glyph</td><td class="desc">
<p>The source glyph slot.</p>
</td></tr>
<tr><td class="val" id="sub_index">sub_index</td><td class="desc">
<p>The index of the subglyph. Must be less than <code>glyph-&gt;num_subglyphs</code>.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="p_index">p_index</td><td class="desc">
<p>The glyph index of the subglyph.</p>
</td></tr>
<tr><td class="val" id="p_flags">p_flags</td><td class="desc">
<p>The subglyph flags, see <a href="../ft2-base_interface/index.html#ft_subglyph_flag_xxx">FT_SUBGLYPH_FLAG_XXX</a>.</p>
</td></tr>
<tr><td class="val" id="p_arg1">p_arg1</td><td class="desc">
<p>The subglyph's first argument (if any).</p>
</td></tr>
<tr><td class="val" id="p_arg2">p_arg2</td><td class="desc">
<p>The subglyph's second argument (if any).</p>
</td></tr>
<tr><td class="val" id="p_transform">p_transform</td><td class="desc">
<p>The subglyph transformation (if any).</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

The values of `*p_arg1`, `*p_arg2`, and `*p_transform` must be interpreted depending on the flags returned in `*p_flags`. See the OpenType specification for details.

<hr>

## FT_Face_Internal

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_Face_InternalRec_*  <b>FT_Face_Internal</b>;
</pre>
</div>


An opaque handle to an `FT_Face_InternalRec` structure that models the private data of a given <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a> object.

This structure might change between releases of FreeType&nbsp;2 and is not generally available to client applications.

<hr>

## FT_Size_Internal

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_Size_InternalRec_*  <b>FT_Size_Internal</b>;
</pre>
</div>


An opaque handle to an `FT_Size_InternalRec` structure, used to model private data of a given <a href="../ft2-base_interface/index.html#ft_size">FT_Size</a> object.

<hr>

## FT_Slot_Internal

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_Slot_InternalRec_*  <b>FT_Slot_Internal</b>;
</pre>
</div>


An opaque handle to an `FT_Slot_InternalRec` structure, used to model private data of a given <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a> object.

<hr>

## FT_FACE_FLAG_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_scalable">FT_FACE_FLAG_SCALABLE</a>          ( 1L &lt;&lt;  0 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_fixed_sizes">FT_FACE_FLAG_FIXED_SIZES</a>       ( 1L &lt;&lt;  1 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_fixed_width">FT_FACE_FLAG_FIXED_WIDTH</a>       ( 1L &lt;&lt;  2 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_sfnt">FT_FACE_FLAG_SFNT</a>              ( 1L &lt;&lt;  3 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_horizontal">FT_FACE_FLAG_HORIZONTAL</a>        ( 1L &lt;&lt;  4 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_vertical">FT_FACE_FLAG_VERTICAL</a>          ( 1L &lt;&lt;  5 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_kerning">FT_FACE_FLAG_KERNING</a>           ( 1L &lt;&lt;  6 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_fast_glyphs">FT_FACE_FLAG_FAST_GLYPHS</a>       ( 1L &lt;&lt;  7 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_multiple_masters">FT_FACE_FLAG_MULTIPLE_MASTERS</a>  ( 1L &lt;&lt;  8 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_glyph_names">FT_FACE_FLAG_GLYPH_NAMES</a>       ( 1L &lt;&lt;  9 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_external_stream">FT_FACE_FLAG_EXTERNAL_STREAM</a>   ( 1L &lt;&lt; 10 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_hinter">FT_FACE_FLAG_HINTER</a>            ( 1L &lt;&lt; 11 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_cid_keyed">FT_FACE_FLAG_CID_KEYED</a>         ( 1L &lt;&lt; 12 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_tricky">FT_FACE_FLAG_TRICKY</a>            ( 1L &lt;&lt; 13 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_color">FT_FACE_FLAG_COLOR</a>             ( 1L &lt;&lt; 14 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_face_flag_variation">FT_FACE_FLAG_VARIATION</a>         ( 1L &lt;&lt; 15 )
</pre>
</div>


A list of bit flags used in the `face_flags` field of the <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a> structure. They inform client applications of properties of the corresponding face.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_face_flag_scalable">FT_FACE_FLAG_SCALABLE</td><td class="desc">
<p>The face contains outline glyphs. Note that a face can contain bitmap strikes also, i.e., a face can have both this flag and <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_FIXED_SIZES</a> set.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_fixed_sizes">FT_FACE_FLAG_FIXED_SIZES</td><td class="desc">
<p>The face contains bitmap strikes. See also the <code>num_fixed_sizes</code> and <code>available_sizes</code> fields of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a>.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_fixed_width">FT_FACE_FLAG_FIXED_WIDTH</td><td class="desc">
<p>The face contains fixed-width characters (like Courier, Lucida, MonoType, etc.).</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_sfnt">FT_FACE_FLAG_SFNT</td><td class="desc">
<p>The face uses the SFNT storage scheme. For now, this means TrueType and OpenType.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_horizontal">FT_FACE_FLAG_HORIZONTAL</td><td class="desc">
<p>The face contains horizontal glyph metrics. This should be set for all common formats.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_vertical">FT_FACE_FLAG_VERTICAL</td><td class="desc">
<p>The face contains vertical glyph metrics. This is only available in some formats, not all of them.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_kerning">FT_FACE_FLAG_KERNING</td><td class="desc">
<p>The face contains kerning information. If set, the kerning distance can be retrieved using the function <a href="../ft2-base_interface/index.html#ft_get_kerning">FT_Get_Kerning</a>. Otherwise the function always return the vector (0,0). Note that FreeType doesn't handle kerning data from the SFNT &lsquo;GPOS&rsquo; table (as present in many OpenType fonts).</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_fast_glyphs">FT_FACE_FLAG_FAST_GLYPHS</td><td class="desc">
<p>THIS FLAG IS DEPRECATED. DO NOT USE OR TEST IT.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_multiple_masters">FT_FACE_FLAG_MULTIPLE_MASTERS</td><td class="desc">
<p>The face contains multiple masters and is capable of interpolating between them. Supported formats are Adobe MM, TrueType GX, and OpenType variation fonts.</p>
<p>See section &lsquo;<a href="../ft2-multiple_masters/index.html#multiple_masters">Multiple Masters</a>&rsquo; for API details.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_glyph_names">FT_FACE_FLAG_GLYPH_NAMES</td><td class="desc">
<p>The face contains glyph names, which can be retrieved using <a href="../ft2-base_interface/index.html#ft_get_glyph_name">FT_Get_Glyph_Name</a>. Note that some TrueType fonts contain broken glyph name tables. Use the function <a href="../ft2-type1_tables/index.html#ft_has_ps_glyph_names">FT_Has_PS_Glyph_Names</a> when needed.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_external_stream">FT_FACE_FLAG_EXTERNAL_STREAM</td><td class="desc">
<p>Used internally by FreeType to indicate that a face's stream was provided by the client application and should not be destroyed when <a href="../ft2-base_interface/index.html#ft_done_face">FT_Done_Face</a> is called. Don't read or test this flag.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_hinter">FT_FACE_FLAG_HINTER</td><td class="desc">
<p>The font driver has a hinting machine of its own. For example, with TrueType fonts, it makes sense to use data from the SFNT &lsquo;gasp&rsquo; table only if the native TrueType hinting engine (with the bytecode interpreter) is available and active.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_cid_keyed">FT_FACE_FLAG_CID_KEYED</td><td class="desc">
<p>The face is CID-keyed. In that case, the face is not accessed by glyph indices but by CID values. For subsetted CID-keyed fonts this has the consequence that not all index values are a valid argument to <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>. Only the CID values for which corresponding glyphs in the subsetted font exist make <code>FT_Load_Glyph</code> return successfully; in all other cases you get an <code>FT_Err_Invalid_Argument</code> error.</p>
<p>Note that CID-keyed fonts that are in an SFNT wrapper (this is, all OpenType/CFF fonts) don't have this flag set since the glyphs are accessed in the normal way (using contiguous indices); the &lsquo;CID-ness&rsquo; isn't visible to the application.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_tricky">FT_FACE_FLAG_TRICKY</td><td class="desc">
<p>The face is &lsquo;tricky&rsquo;, this is, it always needs the font format's native hinting engine to get a reasonable result. A typical example is the old Chinese font <code>mingli.ttf</code> (but not <code>mingliu.ttc</code>) that uses TrueType bytecode instructions to move and scale all of its subglyphs.</p>
<p>It is not possible to auto-hint such fonts using <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_FORCE_AUTOHINT</a>; it will also ignore <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_HINTING</a>. You have to set both <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_HINTING</a> and <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_AUTOHINT</a> to really disable hinting; however, you probably never want this except for demonstration purposes.</p>
<p>Currently, there are about a dozen TrueType fonts in the list of tricky fonts; they are hard-coded in file <code>ttobjs.c</code>.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_color">FT_FACE_FLAG_COLOR</td><td class="desc">
<p>[Since 2.5.1] The face has color glyph tables. See <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_COLOR</a> for more information.</p>
</td></tr>
<tr><td class="val" id="ft_face_flag_variation">FT_FACE_FLAG_VARIATION</td><td class="desc">
<p>[Since 2.9] Set if the current face (or named instance) has been altered with <a href="../ft2-multiple_masters/index.html#ft_set_mm_design_coordinates">FT_Set_MM_Design_Coordinates</a>, <a href="../ft2-multiple_masters/index.html#ft_set_var_design_coordinates">FT_Set_Var_Design_Coordinates</a>, or <a href="../ft2-multiple_masters/index.html#ft_set_var_blend_coordinates">FT_Set_Var_Blend_Coordinates</a>. This flag is unset by a call to <a href="../ft2-multiple_masters/index.html#ft_set_named_instance">FT_Set_Named_Instance</a>.</p>
</td></tr>
</table>

<hr>

## FT_STYLE_FLAG_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_style_flag_italic">FT_STYLE_FLAG_ITALIC</a>  ( 1 &lt;&lt; 0 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_style_flag_bold">FT_STYLE_FLAG_BOLD</a>    ( 1 &lt;&lt; 1 )
</pre>
</div>


A list of bit flags to indicate the style of a given face. These are used in the `style_flags` field of <a href="../ft2-base_interface/index.html#ft_facerec">FT_FaceRec</a>.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_style_flag_italic">FT_STYLE_FLAG_ITALIC</td><td class="desc">
<p>The face style is italic or oblique.</p>
</td></tr>
<tr><td class="val" id="ft_style_flag_bold">FT_STYLE_FLAG_BOLD</td><td class="desc">
<p>The face is bold.</p>
</td></tr>
</table>

<h4>note</h4>

The style information as provided by FreeType is very basic. More details are beyond the scope and should be done on a higher level (for example, by analyzing various fields of the &lsquo;OS/2&rsquo; table in SFNT based fonts).

<hr>

## FT_OPEN_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_open_memory">FT_OPEN_MEMORY</a>    0x1
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_open_stream">FT_OPEN_STREAM</a>    0x2
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_open_pathname">FT_OPEN_PATHNAME</a>  0x4
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_open_driver">FT_OPEN_DRIVER</a>    0x8
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_open_params">FT_OPEN_PARAMS</a>    0x10


  /* these constants are deprecated; use the corresponding `<b>FT_OPEN_XXX</b>' */
  /* values instead                                                      */
#<span class="keyword">define</span> ft_open_memory    <a href="../ft2-base_interface/index.html#ft_open_memory">FT_OPEN_MEMORY</a>
#<span class="keyword">define</span> ft_open_stream    <a href="../ft2-base_interface/index.html#ft_open_stream">FT_OPEN_STREAM</a>
#<span class="keyword">define</span> ft_open_pathname  <a href="../ft2-base_interface/index.html#ft_open_pathname">FT_OPEN_PATHNAME</a>
#<span class="keyword">define</span> ft_open_driver    <a href="../ft2-base_interface/index.html#ft_open_driver">FT_OPEN_DRIVER</a>
#<span class="keyword">define</span> ft_open_params    <a href="../ft2-base_interface/index.html#ft_open_params">FT_OPEN_PARAMS</a>
</pre>
</div>


A list of bit field constants used within the &lsquo;flags&rsquo; field of the <a href="../ft2-base_interface/index.html#ft_open_args">FT_Open_Args</a> structure.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_open_memory">FT_OPEN_MEMORY</td><td class="desc">
<p>This is a memory-based stream.</p>
</td></tr>
<tr><td class="val" id="ft_open_stream">FT_OPEN_STREAM</td><td class="desc">
<p>Copy the stream from the &lsquo;stream&rsquo; field.</p>
</td></tr>
<tr><td class="val" id="ft_open_pathname">FT_OPEN_PATHNAME</td><td class="desc">
<p>Create a new input stream from a C&nbsp;path name.</p>
</td></tr>
<tr><td class="val" id="ft_open_driver">FT_OPEN_DRIVER</td><td class="desc">
<p>Use the &lsquo;driver&rsquo; field.</p>
</td></tr>
<tr><td class="val" id="ft_open_params">FT_OPEN_PARAMS</td><td class="desc">
<p>Use the <code>num_params</code> and &lsquo;params&rsquo; fields.</p>
</td></tr>
</table>

<h4>note</h4>

The `FT_OPEN_MEMORY`, `FT_OPEN_STREAM`, and `FT_OPEN_PATHNAME` flags are mutually exclusive.

<hr>

## FT_LOAD_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_default">FT_LOAD_DEFAULT</a>                      0x0
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_no_scale">FT_LOAD_NO_SCALE</a>                     ( 1L &lt;&lt; 0 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_no_hinting">FT_LOAD_NO_HINTING</a>                   ( 1L &lt;&lt; 1 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_render">FT_LOAD_RENDER</a>                       ( 1L &lt;&lt; 2 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_no_bitmap">FT_LOAD_NO_BITMAP</a>                    ( 1L &lt;&lt; 3 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_vertical_layout">FT_LOAD_VERTICAL_LAYOUT</a>              ( 1L &lt;&lt; 4 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_force_autohint">FT_LOAD_FORCE_AUTOHINT</a>               ( 1L &lt;&lt; 5 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_crop_bitmap">FT_LOAD_CROP_BITMAP</a>                  ( 1L &lt;&lt; 6 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_pedantic">FT_LOAD_PEDANTIC</a>                     ( 1L &lt;&lt; 7 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_ignore_global_advance_width">FT_LOAD_IGNORE_GLOBAL_ADVANCE_WIDTH</a>  ( 1L &lt;&lt; 9 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_no_recurse">FT_LOAD_NO_RECURSE</a>                   ( 1L &lt;&lt; 10 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_ignore_transform">FT_LOAD_IGNORE_TRANSFORM</a>             ( 1L &lt;&lt; 11 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_monochrome">FT_LOAD_MONOCHROME</a>                   ( 1L &lt;&lt; 12 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_linear_design">FT_LOAD_LINEAR_DESIGN</a>                ( 1L &lt;&lt; 13 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_no_autohint">FT_LOAD_NO_AUTOHINT</a>                  ( 1L &lt;&lt; 15 )
  /* Bits 16-19 are used by `FT_LOAD_TARGET_' */
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_color">FT_LOAD_COLOR</a>                        ( 1L &lt;&lt; 20 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_compute_metrics">FT_LOAD_COMPUTE_METRICS</a>              ( 1L &lt;&lt; 21 )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_bitmap_metrics_only">FT_LOAD_BITMAP_METRICS_ONLY</a>          ( 1L &lt;&lt; 22 )
</pre>
</div>


A list of bit field constants for <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a> to indicate what kind of operations to perform during glyph loading.

<h4>values</h4>
<table class="fields long">
<tr><td class="val" id="ft_load_default">FT_LOAD_DEFAULT</td><td class="desc">
<p>Corresponding to&nbsp;0, this value is used as the default glyph load operation. In this case, the following happens:</p>
<ol>
<li><p>FreeType looks for a bitmap for the glyph corresponding to the face's current size. If one is found, the function returns. The bitmap data can be accessed from the glyph slot (see note below).</p>
</li>
<li><p>If no embedded bitmap is searched for or found, FreeType looks for a scalable outline. If one is found, it is loaded from the font file, scaled to device pixels, then &lsquo;hinted&rsquo; to the pixel grid in order to optimize it. The outline data can be accessed from the glyph slot (see note below).</p>
</li>
</ol>
<p>Note that by default the glyph loader doesn't render outlines into bitmaps. The following flags are used to modify this default behaviour to more specific and useful cases.</p>
</td></tr>
<tr><td class="val" id="ft_load_no_scale">FT_LOAD_NO_SCALE</td><td class="desc">
<p>Don't scale the loaded outline glyph but keep it in font units.</p>
<p>This flag implies <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_HINTING</a> and <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_BITMAP</a>, and unsets <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_RENDER</a>.</p>
<p>If the font is &lsquo;tricky&rsquo; (see <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_TRICKY</a> for more), using FT_LOAD_NO_SCALE usually yields meaningless outlines because the subglyphs must be scaled and positioned with hinting instructions. This can be solved by loading the font without FT_LOAD_NO_SCALE and setting the character size to <code>font-&gt;units_per_EM</code>.</p>
</td></tr>
<tr><td class="val" id="ft_load_no_hinting">FT_LOAD_NO_HINTING</td><td class="desc">
<p>Disable hinting. This generally generates &lsquo;blurrier&rsquo; bitmap glyphs when the glyph are rendered in any of the anti-aliased modes. See also the note below.</p>
<p>This flag is implied by <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a>.</p>
</td></tr>
<tr><td class="val" id="ft_load_render">FT_LOAD_RENDER</td><td class="desc">
<p>Call <a href="../ft2-base_interface/index.html#ft_render_glyph">FT_Render_Glyph</a> after the glyph is loaded. By default, the glyph is rendered in <a href="../ft2-base_interface/index.html#ft_render_mode">FT_RENDER_MODE_NORMAL</a> mode. This can be overridden by <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_XXX</a> or <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_MONOCHROME</a>.</p>
<p>This flag is unset by <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a>.</p>
</td></tr>
<tr><td class="val" id="ft_load_no_bitmap">FT_LOAD_NO_BITMAP</td><td class="desc">
<p>Ignore bitmap strikes when loading. Bitmap-only fonts ignore this flag.</p>
<p><a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a> always sets this flag.</p>
</td></tr>
<tr><td class="val" id="ft_load_vertical_layout">FT_LOAD_VERTICAL_LAYOUT</td><td class="desc">
<p>Load the glyph for vertical text layout. In particular, the &lsquo;advance&rsquo; value in the <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a> structure is set to the <code>vertAdvance</code> value of the &lsquo;metrics&rsquo; field.</p>
<p>In case <a href="../ft2-base_interface/index.html#ft_has_vertical">FT_HAS_VERTICAL</a> doesn't return true, you shouldn't use this flag currently. Reason is that in this case vertical metrics get synthesized, and those values are not always consistent across various font formats.</p>
</td></tr>
<tr><td class="val" id="ft_load_force_autohint">FT_LOAD_FORCE_AUTOHINT</td><td class="desc">
<p>Prefer the auto-hinter over the font's native hinter. See also the note below.</p>
</td></tr>
<tr><td class="val" id="ft_load_pedantic">FT_LOAD_PEDANTIC</td><td class="desc">
<p>Make the font driver perform pedantic verifications during glyph loading. This is mostly used to detect broken glyphs in fonts. By default, FreeType tries to handle broken fonts also.</p>
<p>In particular, errors from the TrueType bytecode engine are not passed to the application if this flag is not set; this might result in partially hinted or distorted glyphs in case a glyph's bytecode is buggy.</p>
</td></tr>
<tr><td class="val" id="ft_load_no_recurse">FT_LOAD_NO_RECURSE</td><td class="desc">
<p>Don't load composite glyphs recursively. Instead, the font driver should set the <code>num_subglyph</code> and &lsquo;subglyphs&rsquo; values of the glyph slot accordingly, and set <code>glyph-&gt;format</code> to <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_GLYPH_FORMAT_COMPOSITE</a>. The description of subglyphs can then be accessed with <a href="../ft2-base_interface/index.html#ft_get_subglyph_info">FT_Get_SubGlyph_Info</a>.</p>
<p>This flag implies <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a> and <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_IGNORE_TRANSFORM</a>.</p>
</td></tr>
<tr><td class="val" id="ft_load_ignore_transform">FT_LOAD_IGNORE_TRANSFORM</td><td class="desc">
<p>Ignore the transform matrix set by <a href="../ft2-base_interface/index.html#ft_set_transform">FT_Set_Transform</a>.</p>
</td></tr>
<tr><td class="val" id="ft_load_monochrome">FT_LOAD_MONOCHROME</td><td class="desc">
<p>This flag is used with <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_RENDER</a> to indicate that you want to render an outline glyph to a 1-bit monochrome bitmap glyph, with 8&nbsp;pixels packed into each byte of the bitmap data.</p>
<p>Note that this has no effect on the hinting algorithm used. You should rather use <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_MONO</a> so that the monochrome-optimized hinting algorithm is used.</p>
</td></tr>
<tr><td class="val" id="ft_load_linear_design">FT_LOAD_LINEAR_DESIGN</td><td class="desc">
<p>Keep <code>linearHoriAdvance</code> and <code>linearVertAdvance</code> fields of <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a> in font units. See <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a> for details.</p>
</td></tr>
<tr><td class="val" id="ft_load_no_autohint">FT_LOAD_NO_AUTOHINT</td><td class="desc">
<p>Disable the auto-hinter. See also the note below.</p>
</td></tr>
<tr><td class="val" id="ft_load_color">FT_LOAD_COLOR</td><td class="desc">
<p>Load colored glyphs. There are slight differences depending on the font format.</p>
<p>[Since 2.5] Load embedded color bitmap images. The resulting color bitmaps, if available, will have the <a href="../ft2-basic_types/index.html#ft_pixel_mode">FT_PIXEL_MODE_BGRA</a> format, with pre-multiplied color channels. If the flag is not set and color bitmaps are found, they are converted to 256-level gray bitmaps, using the <a href="../ft2-basic_types/index.html#ft_pixel_mode">FT_PIXEL_MODE_GRAY</a> format.</p>
<p>[Since 2.10] If the glyph index contains an entry in the face's &lsquo;COLR&rsquo; table with a &lsquo;CPAL&rsquo; palette table (as defined in the OpenType specification), make <a href="../ft2-base_interface/index.html#ft_render_glyph">FT_Render_Glyph</a> provide a default blending of the color glyph layers associated with the glyph index, using the same bitmap format as embedded color bitmap images. This is mainly for convenience; for full control of color layers use <a href="../ft2-layer_management/index.html#ft_get_color_glyph_layer">FT_Get_Color_Glyph_Layer</a> and FreeType's color functions like <a href="../ft2-color_management/index.html#ft_palette_select">FT_Palette_Select</a> instead of setting FT_LOAD_COLOR for rendering so that the client application can handle blending by itself.</p>
</td></tr>
<tr><td class="val" id="ft_load_compute_metrics">FT_LOAD_COMPUTE_METRICS</td><td class="desc">
<p>[Since 2.6.1] Compute glyph metrics from the glyph data, without the use of bundled metrics tables (for example, the &lsquo;hdmx&rsquo; table in TrueType fonts). This flag is mainly used by font validating or font editing applications, which need to ignore, verify, or edit those tables.</p>
<p>Currently, this flag is only implemented for TrueType fonts.</p>
</td></tr>
<tr><td class="val" id="ft_load_bitmap_metrics_only">FT_LOAD_BITMAP_METRICS_ONLY</td><td class="desc">
<p>[Since 2.7.1] Request loading of the metrics and bitmap image information of a (possibly embedded) bitmap glyph without allocating or copying the bitmap image data itself. No effect if the target glyph is not a bitmap image.</p>
<p>This flag unsets <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_RENDER</a>.</p>
</td></tr>
<tr><td class="val" id="ft_load_crop_bitmap">FT_LOAD_CROP_BITMAP</td><td class="desc">
<p>Ignored. Deprecated.</p>
</td></tr>
<tr><td class="val" id="ft_load_ignore_global_advance_width">FT_LOAD_IGNORE_GLOBAL_ADVANCE_WIDTH</td><td class="desc">
<p>Ignored. Deprecated.</p>
</td></tr>
</table>

<h4>note</h4>

By default, hinting is enabled and the font's native hinter (see <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_HINTER</a>) is preferred over the auto-hinter. You can disable hinting by setting <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_HINTING</a> or change the precedence by setting <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_FORCE_AUTOHINT</a>. You can also set <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_AUTOHINT</a> in case you don't want the auto-hinter to be used at all.

See the description of <a href="../ft2-base_interface/index.html#ft_face_flag_xxx">FT_FACE_FLAG_TRICKY</a> for a special exception (affecting only a handful of Asian fonts).

Besides deciding which hinter to use, you can also decide which hinting algorithm to use. See <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_XXX</a> for details.

Note that the auto-hinter needs a valid Unicode cmap (either a native one or synthesized by FreeType) for producing correct results. If a font provides an incorrect mapping (for example, assigning the character code U+005A, LATIN CAPITAL LETTER Z, to a glyph depicting a mathematical integral sign), the auto-hinter might produce useless results.

<hr>

## FT_LOAD_TARGET_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> FT_LOAD_TARGET_( x )   ( (<a href="../ft2-basic_types/index.html#ft_int32">FT_Int32</a>)( (x) &amp; 15 ) &lt;&lt; 16 )

#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_target_normal">FT_LOAD_TARGET_NORMAL</a>  FT_LOAD_TARGET_( <a href="../ft2-base_interface/index.html#ft_render_mode_normal">FT_RENDER_MODE_NORMAL</a> )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_target_light">FT_LOAD_TARGET_LIGHT</a>   FT_LOAD_TARGET_( <a href="../ft2-base_interface/index.html#ft_render_mode_light">FT_RENDER_MODE_LIGHT</a>  )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_target_mono">FT_LOAD_TARGET_MONO</a>    FT_LOAD_TARGET_( <a href="../ft2-base_interface/index.html#ft_render_mode_mono">FT_RENDER_MODE_MONO</a>   )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_target_lcd">FT_LOAD_TARGET_LCD</a>     FT_LOAD_TARGET_( <a href="../ft2-base_interface/index.html#ft_render_mode_lcd">FT_RENDER_MODE_LCD</a>    )
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_load_target_lcd_v">FT_LOAD_TARGET_LCD_V</a>   FT_LOAD_TARGET_( <a href="../ft2-base_interface/index.html#ft_render_mode_lcd_v">FT_RENDER_MODE_LCD_V</a>  )
</pre>
</div>


A list of values to select a specific hinting algorithm for the hinter. You should OR one of these values to your `load_flags` when calling <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>.

Note that a font's native hinters may ignore the hinting algorithm you have specified (e.g., the TrueType bytecode interpreter). You can set <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_FORCE_AUTOHINT</a> to ensure that the auto-hinter is used.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_load_target_normal">FT_LOAD_TARGET_NORMAL</td><td class="desc">
<p>The default hinting algorithm, optimized for standard gray-level rendering. For monochrome output, use <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_MONO</a> instead.</p>
</td></tr>
<tr><td class="val" id="ft_load_target_light">FT_LOAD_TARGET_LIGHT</td><td class="desc">
<p>A lighter hinting algorithm for gray-level modes. Many generated glyphs are fuzzier but better resemble their original shape. This is achieved by snapping glyphs to the pixel grid only vertically (Y-axis), as is done by FreeType's new CFF engine or Microsoft's ClearType font renderer. This preserves inter-glyph spacing in horizontal text. The snapping is done either by the native font driver, if the driver itself and the font support it, or by the auto-hinter.</p>
<p>Advance widths are rounded to integer values; however, using the <code>lsb_delta</code> and <code>rsb_delta</code> fields of <a href="../ft2-base_interface/index.html#ft_glyphslotrec">FT_GlyphSlotRec</a>, it is possible to get fractional advance widths for subpixel positioning (which is recommended to use).</p>
<p>If configuration option AF_CONFIG_OPTION_TT_SIZE_METRICS is active, TrueType-like metrics are used to make this mode behave similarly as in unpatched FreeType versions between 2.4.6 and 2.7.1 (inclusive).</p>
</td></tr>
<tr><td class="val" id="ft_load_target_mono">FT_LOAD_TARGET_MONO</td><td class="desc">
<p>Strong hinting algorithm that should only be used for monochrome output. The result is probably unpleasant if the glyph is rendered in non-monochrome modes.</p>
</td></tr>
<tr><td class="val" id="ft_load_target_lcd">FT_LOAD_TARGET_LCD</td><td class="desc">
<p>A variant of <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_LIGHT</a> optimized for horizontally decimated LCD displays.</p>
</td></tr>
<tr><td class="val" id="ft_load_target_lcd_v">FT_LOAD_TARGET_LCD_V</td><td class="desc">
<p>A variant of <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_NORMAL</a> optimized for vertically decimated LCD displays.</p>
</td></tr>
</table>

<h4>note</h4>

You should use only _one_ of the FT_LOAD_TARGET_XXX values in your `load_flags`. They can't be ORed.

If <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_RENDER</a> is also set, the glyph is rendered in the corresponding mode (i.e., the mode that matches the used algorithm best). An exception is FT_LOAD_TARGET_MONO since it implies <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_MONOCHROME</a>.

You can use a hinting algorithm that doesn't correspond to the same rendering mode. As an example, it is possible to use the &lsquo;light&rsquo; hinting algorithm and have the results rendered in horizontal LCD pixel mode, with code like
```
  FT_Load_Glyph( face, glyph_index,
                 load_flags | FT_LOAD_TARGET_LIGHT );

  FT_Render_Glyph( face->glyph, FT_RENDER_MODE_LCD );
```

In general, you should stick with one rendering mode. For example, switching between <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_NORMAL</a> and <a href="../ft2-base_interface/index.html#ft_load_target_xxx">FT_LOAD_TARGET_MONO</a> enforces a lot of recomputation for TrueType fonts, which is slow. Another reason is caching: Selecting a different mode usually causes changes in both the outlines and the rasterized bitmaps; it is thus necessary to empty the cache after a mode switch to avoid false hits.

<hr>

## FT_SUBGLYPH_FLAG_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_args_are_words">FT_SUBGLYPH_FLAG_ARGS_ARE_WORDS</a>          1
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_args_are_xy_values">FT_SUBGLYPH_FLAG_ARGS_ARE_XY_VALUES</a>      2
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_round_xy_to_grid">FT_SUBGLYPH_FLAG_ROUND_XY_TO_GRID</a>        4
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_scale">FT_SUBGLYPH_FLAG_SCALE</a>                   8
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_xy_scale">FT_SUBGLYPH_FLAG_XY_SCALE</a>             0x40
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_2x2">FT_SUBGLYPH_FLAG_2X2</a>                  0x80
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_subglyph_flag_use_my_metrics">FT_SUBGLYPH_FLAG_USE_MY_METRICS</a>      0x200
</pre>
</div>


A list of constants describing subglyphs. Please refer to the &lsquo;glyf&rsquo; table description in the OpenType specification for the meaning of the various flags (which get synthesized for non-OpenType subglyphs).

<https://docs.microsoft.com/en-us/typography/opentype/spec/glyf#composite-glyph-description>

<h4>values</h4>
<table class="fields long">
<tr><td class="val" id="ft_subglyph_flag_args_are_words">FT_SUBGLYPH_FLAG_ARGS_ARE_WORDS</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_args_are_xy_values">FT_SUBGLYPH_FLAG_ARGS_ARE_XY_VALUES</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_round_xy_to_grid">FT_SUBGLYPH_FLAG_ROUND_XY_TO_GRID</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_scale">FT_SUBGLYPH_FLAG_SCALE</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_xy_scale">FT_SUBGLYPH_FLAG_XY_SCALE</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_2x2">FT_SUBGLYPH_FLAG_2X2</td><td class="desc">

</td></tr>
<tr><td class="val" id="ft_subglyph_flag_use_my_metrics">FT_SUBGLYPH_FLAG_USE_MY_METRICS</td><td class="desc">

</td></tr>
</table>

<hr>

## FT_FSTYPE_XXX

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_installable_embedding">FT_FSTYPE_INSTALLABLE_EMBEDDING</a>         0x0000
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_restricted_license_embedding">FT_FSTYPE_RESTRICTED_LICENSE_EMBEDDING</a>  0x0002
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_preview_and_print_embedding">FT_FSTYPE_PREVIEW_AND_PRINT_EMBEDDING</a>   0x0004
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_editable_embedding">FT_FSTYPE_EDITABLE_EMBEDDING</a>            0x0008
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_no_subsetting">FT_FSTYPE_NO_SUBSETTING</a>                 0x0100
#<span class="keyword">define</span> <a href="../ft2-base_interface/index.html#ft_fstype_bitmap_embedding_only">FT_FSTYPE_BITMAP_EMBEDDING_ONLY</a>         0x0200
</pre>
</div>


A list of bit flags used in the `fsType` field of the OS/2 table in a TrueType or OpenType font and the &lsquo;FSType&rsquo; entry in a PostScript font. These bit flags are returned by <a href="../ft2-base_interface/index.html#ft_get_fstype_flags">FT_Get_FSType_Flags</a>; they inform client applications of embedding and subsetting restrictions associated with a font.

See <https://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/FontPolicies.pdf> for more details.

<h4>values</h4>
<table class="fields long">
<tr><td class="val" id="ft_fstype_installable_embedding">FT_FSTYPE_INSTALLABLE_EMBEDDING</td><td class="desc">
<p>Fonts with no fsType bit set may be embedded and permanently installed on the remote system by an application.</p>
</td></tr>
<tr><td class="val" id="ft_fstype_restricted_license_embedding">FT_FSTYPE_RESTRICTED_LICENSE_EMBEDDING</td><td class="desc">
<p>Fonts that have only this bit set must not be modified, embedded or exchanged in any manner without first obtaining permission of the font software copyright owner.</p>
</td></tr>
<tr><td class="val" id="ft_fstype_preview_and_print_embedding">FT_FSTYPE_PREVIEW_AND_PRINT_EMBEDDING</td><td class="desc">
<p>The font may be embedded and temporarily loaded on the remote system. Documents containing Preview &amp; Print fonts must be opened &lsquo;read-only&rsquo;; no edits can be applied to the document.</p>
</td></tr>
<tr><td class="val" id="ft_fstype_editable_embedding">FT_FSTYPE_EDITABLE_EMBEDDING</td><td class="desc">
<p>The font may be embedded but must only be installed temporarily on other systems. In contrast to Preview &amp; Print fonts, documents containing editable fonts may be opened for reading, editing is permitted, and changes may be saved.</p>
</td></tr>
<tr><td class="val" id="ft_fstype_no_subsetting">FT_FSTYPE_NO_SUBSETTING</td><td class="desc">
<p>The font may not be subsetted prior to embedding.</p>
</td></tr>
<tr><td class="val" id="ft_fstype_bitmap_embedding_only">FT_FSTYPE_BITMAP_EMBEDDING_ONLY</td><td class="desc">
<p>Only bitmaps contained in the font may be embedded; no outline data may be embedded. If there are no bitmaps available in the font, then the font is unembeddable.</p>
</td></tr>
</table>

<h4>note</h4>

The flags are ORed together, thus more than a single value can be returned.

While the `fsType` flags can indicate that a font may be embedded, a license with the font vendor may be separately required to use the font in this way.

<hr>

## FT_HAS_FAST_GLYPHS

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
#<span class="keyword">define</span> <b>FT_HAS_FAST_GLYPHS</b>( face )  0
</pre>
</div>


Deprecated.

<hr>

