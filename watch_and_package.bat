@echo off
echo === Power BI Visual Watch Mode ===
echo Esperando cambios en archivos .ts, .less o capabilities.json...
echo Se recompilará automaticamente con pbiviz package
echo ----------------------------------------

chokidar "./src/**/*.ts" "./src/**/*.less" "./capabilities.json" -c "pbiviz package"