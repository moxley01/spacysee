import setuptools
import os

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="spacysee",
    version="0.0.4",
    author="Matthew Oxley",
    description="Visualizer for spaCy NER models",
    long_description=long_description,
    long_description_content_type="text/markdown",
    include_package_data=True,
    packages=["client/build"], # this is crucial in order for the following line to work
    package_data={'client/build': ['*.html']},
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    py_modules=["spacysee"],
    package_dir={'':'src/spacysee'},
    install_requires=[],
)