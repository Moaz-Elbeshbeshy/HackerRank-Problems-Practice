BINARY=myapp

clean:
	@echo "Cleaning up previous builds"
	@go clean
	@rm -rf ./artifacts/*

	@env GOOS=darwin GOARCH=amd64 go build -o ./artifacts/osx/${BINARY} -v .
	@env GOOS=linux GOARCH=amd64 go build -o ./artifacts/linux/${BINARY} -v .
	@env GOOS=windows GOARCH=amd64 go build -o ./artifacts/windows/${BINARY} -v .

	@ls -lR ./artifacts

install:
	@echo "Installs to $$GOPATH/bin"
	@go build ./main.go
	@go install

uninstall:
	@echo "Removing from $$GOPATH/bin"
	@go clean -i

git-hooks:
	test -d .git/hooks || mkdir -p .git/hooks
	cp -f hooks/pre-commit.hook .git/hooks/pre-commit
	chmod a+x .git/hooks/pre-commit
