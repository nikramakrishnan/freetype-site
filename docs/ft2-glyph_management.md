[Docs](ft2-index.md) &raquo; [Core API](ft2-toc.md#core-api) &raquo; Glyph Management

-------------------------------

# Glyph Management

## Synopsis

This section contains definitions used to manage glyph data through generic FT_Glyph objects. Each of them can contain a bitmap, a vector outline, or even images in other formats.

## FT_Glyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_GlyphRec_*  <b>FT_Glyph</b>;
</pre>
</div>


Handle to an object used to model generic glyph images. It is a pointer to the <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a> structure and can contain a glyph bitmap or pointer.

<h4>note</h4>

Glyph objects are not owned by the library. You must thus release them manually (through <a href="../ft2-glyph_management/index.html#ft_done_glyph">FT_Done_Glyph</a>) _before_ calling <a href="../ft2-base_interface/index.html#ft_done_freetype">FT_Done_FreeType</a>.

<hr>

## FT_GlyphRec

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_GlyphRec_
  {
    <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>             library;
    <span class="keyword">const</span> FT_Glyph_Class*  clazz;
    <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_Glyph_Format</a>        format;
    <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>              advance;

  } <b>FT_GlyphRec</b>;
</pre>
</div>


The root glyph structure contains a given glyph image plus its advance width in 16.16 fixed-point format.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the FreeType library object.</p>
</td></tr>
<tr><td class="val" id="clazz">clazz</td><td class="desc">
<p>A pointer to the glyph's class. Private.</p>
</td></tr>
<tr><td class="val" id="format">format</td><td class="desc">
<p>The format of the glyph's image.</p>
</td></tr>
<tr><td class="val" id="advance">advance</td><td class="desc">
<p>A 16.16 vector that gives the glyph's advance width.</p>
</td></tr>
</table>

<hr>

## FT_BitmapGlyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_BitmapGlyphRec_*  <b>FT_BitmapGlyph</b>;
</pre>
</div>


A handle to an object used to model a bitmap glyph image. This is a sub-class of <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>, and a pointer to <a href="../ft2-glyph_management/index.html#ft_bitmapglyphrec">FT_BitmapGlyphRec</a>.

<hr>

## FT_BitmapGlyphRec

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_BitmapGlyphRec_
  {
    <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a>  root;
    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>       left;
    <a href="../ft2-basic_types/index.html#ft_int">FT_Int</a>       top;
    <a href="../ft2-basic_types/index.html#ft_bitmap">FT_Bitmap</a>    bitmap;

  } <b>FT_BitmapGlyphRec</b>;
</pre>
</div>


A structure used for bitmap glyph images. This really is a &lsquo;sub-class&rsquo; of <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="root">root</td><td class="desc">
<p>The root <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> fields.</p>
</td></tr>
<tr><td class="val" id="left">left</td><td class="desc">
<p>The left-side bearing, i.e., the horizontal distance from the current pen position to the left border of the glyph bitmap.</p>
</td></tr>
<tr><td class="val" id="top">top</td><td class="desc">
<p>The top-side bearing, i.e., the vertical distance from the current pen position to the top border of the glyph bitmap. This distance is positive for upwards&nbsp;y!</p>
</td></tr>
<tr><td class="val" id="bitmap">bitmap</td><td class="desc">
<p>A descriptor for the bitmap.</p>
</td></tr>
</table>

<h4>note</h4>

You can typecast an <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> to <a href="../ft2-glyph_management/index.html#ft_bitmapglyph">FT_BitmapGlyph</a> if you have `glyph->format == FT_GLYPH_FORMAT_BITMAP`. This lets you access the bitmap's contents easily.

The corresponding pixel buffer is always owned by <a href="../ft2-glyph_management/index.html#ft_bitmapglyph">FT_BitmapGlyph</a> and is thus created and destroyed with it.

<hr>

## FT_OutlineGlyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span> FT_OutlineGlyphRec_*  <b>FT_OutlineGlyph</b>;
</pre>
</div>


A handle to an object used to model an outline glyph image. This is a sub-class of <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>, and a pointer to <a href="../ft2-glyph_management/index.html#ft_outlineglyphrec">FT_OutlineGlyphRec</a>.

<hr>

## FT_OutlineGlyphRec

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">struct</span>  FT_OutlineGlyphRec_
  {
    <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a>  root;
    <a href="../ft2-outline_processing/index.html#ft_outline">FT_Outline</a>   outline;

  } <b>FT_OutlineGlyphRec</b>;
</pre>
</div>


A structure used for outline (vectorial) glyph images. This really is a &lsquo;sub-class&rsquo; of <a href="../ft2-glyph_management/index.html#ft_glyphrec">FT_GlyphRec</a>.

<h4>fields</h4>
<table class="fields">
<tr><td class="val" id="root">root</td><td class="desc">
<p>The root <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> fields.</p>
</td></tr>
<tr><td class="val" id="outline">outline</td><td class="desc">
<p>A descriptor for the outline.</p>
</td></tr>
</table>

<h4>note</h4>

You can typecast an <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> to <a href="../ft2-glyph_management/index.html#ft_outlineglyph">FT_OutlineGlyph</a> if you have `glyph->format == FT_GLYPH_FORMAT_OUTLINE`. This lets you access the outline's content easily.

As the outline is extracted from a glyph slot, its coordinates are expressed normally in 26.6 pixels, unless the flag <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a> was used in <a href="../ft2-base_interface/index.html#ft_load_glyph">FT_Load_Glyph</a>() or <a href="../ft2-base_interface/index.html#ft_load_char">FT_Load_Char</a>().

The outline's tables are always owned by the object and are destroyed with it.

<hr>

## FT_New_Glyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_New_Glyph</b>( <a href="../ft2-base_interface/index.html#ft_library">FT_Library</a>       library,
                <a href="../ft2-basic_types/index.html#ft_glyph_format">FT_Glyph_Format</a>  format,
                <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>         *aglyph );
</pre>
</div>


A function used to create a new empty glyph image. Note that the created <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> object must be released with <a href="../ft2-glyph_management/index.html#ft_done_glyph">FT_Done_Glyph</a>.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="library">library</td><td class="desc">
<p>A handle to the FreeType library object.</p>
</td></tr>
<tr><td class="val" id="format">format</td><td class="desc">
<p>The format of the glyph's image.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="aglyph">aglyph</td><td class="desc">
<p>A handle to the glyph object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>since</h4>

2.10

<hr>

## FT_Get_Glyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Get_Glyph</b>( <a href="../ft2-base_interface/index.html#ft_glyphslot">FT_GlyphSlot</a>  slot,
                <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>     *aglyph );
</pre>
</div>


A function used to extract a glyph image from a slot. Note that the created <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> object must be released with <a href="../ft2-glyph_management/index.html#ft_done_glyph">FT_Done_Glyph</a>.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="slot">slot</td><td class="desc">
<p>A handle to the source glyph slot.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="aglyph">aglyph</td><td class="desc">
<p>A handle to the glyph object.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

Because `*aglyph->advance.x` and `*aglyph->advance.y` are 16.16 fixed-point numbers, `slot->advance.x` and `slot->advance.y` (which are in 26.6 fixed-point format) must be in the range ]-32768;32768[.

<hr>

## FT_Glyph_Copy

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Glyph_Copy</b>( <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>   source,
                 <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>  *target );
</pre>
</div>


A function used to copy a glyph image. Note that the created <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> object must be released with <a href="../ft2-glyph_management/index.html#ft_done_glyph">FT_Done_Glyph</a>.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="source">source</td><td class="desc">
<p>A handle to the source glyph object.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="target">target</td><td class="desc">
<p>A handle to the target glyph object. 0&nbsp;in case of error.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<hr>

## FT_Glyph_Transform

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Glyph_Transform</b>( <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>    glyph,
                      <a href="../ft2-basic_types/index.html#ft_matrix">FT_Matrix</a>*  matrix,
                      <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>*  delta );
</pre>
</div>


Transform a glyph image if its format is scalable.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="glyph">glyph</td><td class="desc">
<p>A handle to the target glyph object.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="matrix">matrix</td><td class="desc">
<p>A pointer to a 2x2 matrix to apply.</p>
</td></tr>
<tr><td class="val" id="delta">delta</td><td class="desc">
<p>A pointer to a 2d vector to apply. Coordinates are expressed in 1/64th of a pixel.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code (if not 0, the glyph format is not scalable).

<h4>note</h4>

The 2x2 transformation matrix is also applied to the glyph's advance vector.

<hr>

## FT_Glyph_BBox_Mode

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  <span class="keyword">typedef</span> <span class="keyword">enum</span>  FT_Glyph_BBox_Mode_
  {
    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_unscaled">FT_GLYPH_BBOX_UNSCALED</a>  = 0,
    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_subpixels">FT_GLYPH_BBOX_SUBPIXELS</a> = 0,
    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_gridfit">FT_GLYPH_BBOX_GRIDFIT</a>   = 1,
    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_truncate">FT_GLYPH_BBOX_TRUNCATE</a>  = 2,
    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_pixels">FT_GLYPH_BBOX_PIXELS</a>    = 3

  } <b>FT_Glyph_BBox_Mode</b>;


  /* these constants are deprecated; use the corresponding */
  /* `<b>FT_Glyph_BBox_Mode</b>' values instead                   */
#<span class="keyword">define</span> ft_glyph_bbox_unscaled   <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_unscaled">FT_GLYPH_BBOX_UNSCALED</a>
#<span class="keyword">define</span> ft_glyph_bbox_subpixels  <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_subpixels">FT_GLYPH_BBOX_SUBPIXELS</a>
#<span class="keyword">define</span> ft_glyph_bbox_gridfit    <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_gridfit">FT_GLYPH_BBOX_GRIDFIT</a>
#<span class="keyword">define</span> ft_glyph_bbox_truncate   <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_truncate">FT_GLYPH_BBOX_TRUNCATE</a>
#<span class="keyword">define</span> ft_glyph_bbox_pixels     <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_pixels">FT_GLYPH_BBOX_PIXELS</a>
</pre>
</div>


The mode how the values of <a href="../ft2-glyph_management/index.html#ft_glyph_get_cbox">FT_Glyph_Get_CBox</a> are returned.

<h4>values</h4>
<table class="fields">
<tr><td class="val" id="ft_glyph_bbox_unscaled">FT_GLYPH_BBOX_UNSCALED</td><td class="desc">
<p>Return unscaled font units.</p>
</td></tr>
<tr><td class="val" id="ft_glyph_bbox_subpixels">FT_GLYPH_BBOX_SUBPIXELS</td><td class="desc">
<p>Return unfitted 26.6 coordinates.</p>
</td></tr>
<tr><td class="val" id="ft_glyph_bbox_gridfit">FT_GLYPH_BBOX_GRIDFIT</td><td class="desc">
<p>Return grid-fitted 26.6 coordinates.</p>
</td></tr>
<tr><td class="val" id="ft_glyph_bbox_truncate">FT_GLYPH_BBOX_TRUNCATE</td><td class="desc">
<p>Return coordinates in integer pixels.</p>
</td></tr>
<tr><td class="val" id="ft_glyph_bbox_pixels">FT_GLYPH_BBOX_PIXELS</td><td class="desc">
<p>Return grid-fitted pixel coordinates.</p>
</td></tr>
</table>

<hr>

## FT_Glyph_Get_CBox

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <span class="keyword">void</span> )
  <b>FT_Glyph_Get_CBox</b>( <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>  glyph,
                     <a href="../ft2-basic_types/index.html#ft_uint">FT_UInt</a>   bbox_mode,
                     <a href="../ft2-basic_types/index.html#ft_bbox">FT_BBox</a>  *acbox );
</pre>
</div>


Return a glyph's &lsquo;control box&rsquo;. The control box encloses all the outline's points, including Bezier control points. Though it coincides with the exact bounding box for most glyphs, it can be slightly larger in some situations (like when rotating an outline that contains Bezier outside arcs).

Computing the control box is very fast, while getting the bounding box can take much more time as it needs to walk over all segments and arcs in the outline. To get the latter, you can use the &lsquo;ftbbox&rsquo; component, which is dedicated to this single task.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="glyph">glyph</td><td class="desc">
<p>A handle to the source glyph object.</p>
</td></tr>
<tr><td class="val" id="mode">mode</td><td class="desc">
<p>The mode that indicates how to interpret the returned bounding box values.</p>
</td></tr>
</table>

<h4>output</h4>
<table class="fields">
<tr><td class="val" id="acbox">acbox</td><td class="desc">
<p>The glyph coordinate bounding box. Coordinates are expressed in 1/64th of pixels if it is grid-fitted.</p>
</td></tr>
</table>

<h4>note</h4>

Coordinates are relative to the glyph origin, using the y&nbsp;upwards convention.

If the glyph has been loaded with <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a>, `bbox_mode` must be set to <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_mode">FT_GLYPH_BBOX_UNSCALED</a> to get unscaled font units in 26.6 pixel format. The value <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_mode">FT_GLYPH_BBOX_SUBPIXELS</a> is another name for this constant.

If the font is tricky and the glyph has been loaded with <a href="../ft2-base_interface/index.html#ft_load_xxx">FT_LOAD_NO_SCALE</a>, the resulting CBox is meaningless. To get reasonable values for the CBox it is necessary to load the glyph at a large ppem value (so that the hinting instructions can properly shift and scale the subglyphs), then extracting the CBox, which can be eventually converted back to font units.

Note that the maximum coordinates are exclusive, which means that one can compute the width and height of the glyph image (be it in integer or 26.6 pixels) as:
```
  width  = bbox.xMax - bbox.xMin;
  height = bbox.yMax - bbox.yMin;
```

Note also that for 26.6 coordinates, if `bbox_mode` is set to <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_mode">FT_GLYPH_BBOX_GRIDFIT</a>, the coordinates will also be grid-fitted, which corresponds to:
```
  bbox.xMin = FLOOR(bbox.xMin);
  bbox.yMin = FLOOR(bbox.yMin);
  bbox.xMax = CEILING(bbox.xMax);
  bbox.yMax = CEILING(bbox.yMax);
```

To get the bbox in pixel coordinates, set `bbox_mode` to <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_mode">FT_GLYPH_BBOX_TRUNCATE</a>.

To get the bbox in grid-fitted pixel coordinates, set `bbox_mode` to <a href="../ft2-glyph_management/index.html#ft_glyph_bbox_mode">FT_GLYPH_BBOX_PIXELS</a>.

<hr>

## FT_Glyph_To_Bitmap

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <a href="../ft2-basic_types/index.html#ft_error">FT_Error</a> )
  <b>FT_Glyph_To_Bitmap</b>( <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>*       the_glyph,
                      <a href="../ft2-base_interface/index.html#ft_render_mode">FT_Render_Mode</a>  render_mode,
                      <a href="../ft2-basic_types/index.html#ft_vector">FT_Vector</a>*      origin,
                      <a href="../ft2-basic_types/index.html#ft_bool">FT_Bool</a>         destroy );
</pre>
</div>


Convert a given glyph object to a bitmap glyph object.

<h4>inout</h4>
<table class="fields">
<tr><td class="val" id="the_glyph">the_glyph</td><td class="desc">
<p>A pointer to a handle to the target glyph.</p>
</td></tr>
</table>

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="render_mode">render_mode</td><td class="desc">
<p>An enumeration that describes how the data is rendered.</p>
</td></tr>
<tr><td class="val" id="origin">origin</td><td class="desc">
<p>A pointer to a vector used to translate the glyph image before rendering. Can be&nbsp;0 (if no translation). The origin is expressed in 26.6 pixels.</p>
</td></tr>
<tr><td class="val" id="destroy">destroy</td><td class="desc">
<p>A boolean that indicates that the original glyph image should be destroyed by this function. It is never destroyed in case of error.</p>
</td></tr>
</table>

<h4>return</h4>

FreeType error code. 0&nbsp;means success.

<h4>note</h4>

This function does nothing if the glyph format isn't scalable.

The glyph image is translated with the &lsquo;origin&rsquo; vector before rendering.

The first parameter is a pointer to an <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a> handle, that will be _replaced_ by this function (with newly allocated data). Typically, you would use (omitting error handling):


```
  FT_Glyph        glyph;
  FT_BitmapGlyph  glyph_bitmap;


  // load glyph
  error = FT_Load_Char( face, glyph_index, FT_LOAD_DEFAULT );

  // extract glyph image
  error = FT_Get_Glyph( face->glyph, &glyph );

  // convert to a bitmap (default render mode + destroying old)
  if ( glyph->format != FT_GLYPH_FORMAT_BITMAP )
  {
    error = FT_Glyph_To_Bitmap( &glyph, FT_RENDER_MODE_NORMAL,
                                0, 1 );
    if ( error ) // `glyph' unchanged
      ...
  }

  // access bitmap content by typecasting
  glyph_bitmap = (FT_BitmapGlyph)glyph;

  // do funny stuff with it, like blitting/drawing
  ...

  // discard glyph image (bitmap or not)
  FT_Done_Glyph( glyph );
```



Here another example, again without error handling:


```
  FT_Glyph  glyphs[MAX_GLYPHS]


  ...

  for ( idx = 0; i < MAX_GLYPHS; i++ )
    error = FT_Load_Glyph( face, idx, FT_LOAD_DEFAULT ) ||
            FT_Get_Glyph ( face->glyph, &glyphs[idx] );

  ...

  for ( idx = 0; i < MAX_GLYPHS; i++ )
  {
    FT_Glyph  bitmap = glyphs[idx];


    ...

    // after this call, `bitmap' no longer points into
    // the `glyphs' array (and the old value isn't destroyed)
    FT_Glyph_To_Bitmap( &bitmap, FT_RENDER_MODE_MONO, 0, 0 );

    ...

    FT_Done_Glyph( bitmap );
  }

  ...

  for ( idx = 0; i < MAX_GLYPHS; i++ )
    FT_Done_Glyph( glyphs[idx] );
```

<hr>

## FT_Done_Glyph

Defined in FT_GLYPH_H (freetype/ftglyph.h).

<div class = "codehilite">
<pre>
  FT_EXPORT( <span class="keyword">void</span> )
  <b>FT_Done_Glyph</b>( <a href="../ft2-glyph_management/index.html#ft_glyph">FT_Glyph</a>  glyph );
</pre>
</div>


Destroy a given glyph.

<h4>input</h4>
<table class="fields">
<tr><td class="val" id="glyph">glyph</td><td class="desc">
<p>A handle to the target glyph object.</p>
</td></tr>
</table>

<hr>

