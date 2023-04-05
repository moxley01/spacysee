import setuptools
import os

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="spacysee",                     # This is the name of the package
    version="0.0.3",                        # The initial release version
    author="Matthew Oxley",                     # Full name of the author
    description="Visualizer for spaCy NER models",
    long_description=long_description,      # Long description read from the the readme file
    long_description_content_type="text/markdown",
    include_package_data=True,
    packages=["client/build"],    # List of all python modules to be installed
    package_data={'client/build': ['*.html']},
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],                                      # Information to filter the project on PyPi website
    python_requires='>=3.6',                # Minimum version requirement of the package
    py_modules=["spacysee"],             # Name of the python package
    package_dir={'':'src/spacysee'},     # Directory of the source code of the package
    install_requires=[],                     # Install other dependencies if any
)