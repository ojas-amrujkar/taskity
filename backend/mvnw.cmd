@echo off
set "DIR=%~dp0"
"%DIR%mvn-dist\apache-maven-3.8.8\bin\mvn.cmd" -f "%DIR%pom.xml" %*
