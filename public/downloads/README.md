# Downloads Directory

This directory contains product catalogs and technical documentation for download.

## Directory Structure

- `mitsubishi/` - Mitsubishi Electric product catalogs
- `erico/` - ERICO product catalogs
- `ls-industrial/` - LS Industrial product catalogs
- `noark/` - Noark product catalogs
- `klemsan/` - Klemsan product catalogs
- `katko/` - Katko product catalogs
- `tmeic/` - TMEIC product catalogs
- `elsteel/` - Elsteel product catalogs

## Adding New Catalogs

1. Place PDF files in the appropriate brand directory
2. Update the catalog data in `components/page/CatalogsPage.tsx`
3. Ensure file names match the `downloadUrl` values in the component

## File Naming Convention

Use descriptive names with the format:
`{product-category}-catalog-{year}.pdf`

Example: `plc-controllers-catalog-2024.pdf` 