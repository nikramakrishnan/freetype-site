[Docs](ft2-index.md) &raquo; [Core API](ft2-toc.md#core-api) &raquo; Glyph Layer Management

-------------------------------

# Glyph Layer Management

## Synopsis

The functions described here allow access of colored glyph layer data in OpenType's &lsquo;COLR&rsquo; tables.

## FT_LayerIterator

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_LayerIterator_
  {
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>   num_layers;
    <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>   layer;
    <a href="../ft2-basic_types/index.html#ft_byte">FT_Byte</a>*  p;

  } <b>FT_LayerIterator</b>;
</pre>
</div>


This iterator object is needed for <a href="../ft2-layer_management/index.html#ft_get_color_glyph_layer">FT_Get_Color_Glyph_Layer</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="num_layers">num_layers</td><td class="desc">
<p>The number of glyph layers for the requested glyph index. Will be set by <a href="../ft2-layer_management/index.html#ft_get_color_glyph_layer">FT_Get_Color_Glyph_Layer</a>.</p>
</td></tr>
<tr><td class="val" id="layer">layer</td><td class="desc">
<p>The current layer. Will be set by <a href="../ft2-layer_management/index.html#ft_get_color_glyph_layer">FT_Get_Color_Glyph_Layer</a>.</p>
</td></tr>
<tr><td class="val" id="p">p</td><td class="desc">
<p>An opaque pointer into &lsquo;COLR&rsquo; table data. The caller must set this to NULL before the first call of <a href="../ft2-layer_management/index.html#ft_get_color_glyph_layer">FT_Get_Color_Glyph_Layer</a>.</p>
</td></tr>
</table>

<hr>

## FT_Get_Color_Glyph_Layer

Defined in FT_FREETYPE_H (freetype/freetype.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a> )
  <b>FT_Get_Color_Glyph_Layer</b>( <a href="../ft2-base_interface/index.html#ft_face">FT_Face</a>            face,
                            <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>            base_glyph,
                            <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>           *acolor_index,
                            <a href="../ft2-layer_management/index.html#ft_layeriterator">FT_LayerIterator</a>*  iterator );
</pre>
</div>


This is an interface to the &lsquo;COLR&rsquo; table in OpenType fonts to iteratively retrieve the colored glyph layers associated with the current glyph slot.

<https://docs.microsoft.com/en-us/typography/opentype/spec/colr>

The glyph layer data for a given glyph index, if present, provides an alternative, multi-colour glyph representation: Instead of rendering the outline or bitmap with the given glyph index, glyphs with the indices and colors returned by this function are rendered layer by layer.

The returned elements are ordered in the z&nbsp;direction from bottom to top; the 'n'th element should be rendered with the associated palette color and blended on top of the already rendered layers (elements 0, 1, ..., n-1).

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="face">face</td><td class="desc">
<p>A handle to the parent face object.</p>
</td></tr>
<tr><td class="val" id="base_glyph">base_glyph</td><td class="desc">
<p>The glyph index the colored glyph layers are associated with.</p>
</td></tr>
</table>

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="iterator">iterator</td><td class="desc">
<p>An <a href="../ft2-layer_management/index.html#ft_layeriterator">FT_LayerIterator</a> object. For the first call you should set <code>iterator-&gt;p</code> to NULL. For all following calls, simply use the same object again.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="acolor_index">acolor_index</td><td class="desc">
<p>The color index into the font face's color palette of the current layer. The value 0xFFFF is special; it doesn't reference a palette entry but indicates that the text foreground color should be used instead (to be set up by the application outside of FreeType).</p>
<p>The color palette can be retrieved with <a href="../ft2-color_management/index.html#ft_palette_select">FT_Palette_Select</a>.</p>
</td></tr>
</table>

<h4>return</h4>

The glyph index of the current layer. If there are no more layers (or if there are no layers at all), value&nbsp;0 gets returned. In case of an error, value&nbsp;0 is returned also.

<h4>note</h4>

This function is necessary if you want to handle glyph layers by yourself. In particular, functions that operate with <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a> objects (like <a href="../ft2-glyph_management/index.html#ft_get_glyph">FT_Get_Glyph</a> or <a href="../ft2-glyph_management/index.html#ft_glyph_to_bitmap">FT_Glyph_To_Bitmap</a>) don't have access to this information.

<a href="../ft2-base_interface/index.html#ft_render_glyph">FT_Render_Glyph</a>, however, handles colored glyph layers automatically if the <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_COLOR</a> flag is passed to it.

<h4>example</h4>
```
  FT_Color*         palette;
  FT_LayerIterator  iterator;

  FT_UInt  layer_glyph_index;
  FT_UInt  layer_color_index;


  error = FT_Palette_Select( face, palette_index, &palette );
  if ( error )
    palette = NULL;

  iterator.p        = NULL;
  layer_glyph_index = FT_Get_Color_Glyph_Layer( face,
                                                glyph_index,
                                                &layer_color_index,
                                                &iterator );

  if ( palette && layer_glyph_index )
  {
    do
    {
      FT_Color  layer_color = palette[layer_color_index];


      // Load and render glyph `layer_glyph_index', then
      // blend resulting pixmap with previously created pixmaps.

    } while ( ( layer_glyph_index =
                  FT_Get_Color_Glyph_Layer( face,
                                            glyph_index,
                                            &layer_color_index,
                                            &iterator ) ) != 0 );
  }
```

<hr>

